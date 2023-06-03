import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Isize } from 'src/app/interface/size';
import { IColor } from 'src/app/interface/color';
import { ICategory } from 'src/app/interface/category';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categoy-add',
  templateUrl: './categoy-add.component.html',
  styleUrls: ['./categoy-add.component.css']
})
export class CategoyAddComponent {
  categoys!: Isize[];
  categoyForm!: FormGroup;
  submitted = false;
  constructor(private productService: ProductService, private router: Router) {
    this.categoyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.productService.getCategorys().subscribe((data: any) => {
      this.categoys = data.categoy;
    });
  }
  onHandleSubmit() {
    this.submitted = true;
    const formData = { ...this.categoyForm.value };
    if (this.categoyForm.valid) {
      console.log(formData);
      // Gọi phương thức đăng ký từ ProductService
      this.productService.addCategorys(formData).subscribe(
        (response) => {
          // Xử lý phản hồi từ API khi đăng ký thành công
          this.router.navigate(['/admin/categorys']);
          console.log('Đăng ký thành công', response);
        },
        (error) => {
          // Xử lý lỗi từ API khi đăng ký thất bại
          console.log('Đăng ký thất bại', error);
        }
      );
    }
  }
}
