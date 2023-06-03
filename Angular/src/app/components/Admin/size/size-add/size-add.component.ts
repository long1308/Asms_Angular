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
  selector: 'app-size-add',
  templateUrl: './size-add.component.html',
  styleUrls: ['./size-add.component.css']
})
export class SizeAddComponent {
  sizes!: Isize[];
  sizeForm!: FormGroup;
  submitted = false;
  constructor(private productService: ProductService, private router: Router) {
    this.sizeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.productService.getSizes().subscribe((data: any) => {
      this.sizes = data.size;
    });
  }
  onHandleSubmit() {
    this.submitted = true;
    const formData = { ...this.sizeForm.value };
    if (this.sizeForm.valid) {
      console.log(formData);
      // Gọi phương thức đăng ký từ ProductService
      this.productService.addSize(formData).subscribe(
        (response) => {
          // Xử lý phản hồi từ API khi đăng ký thành công
          this.router.navigate(['/admin/size']);
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
