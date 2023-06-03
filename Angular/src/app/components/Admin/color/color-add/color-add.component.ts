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
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent {
  colors!: IColor[];
  colorForm!: FormGroup;
  submitted = false;
  constructor(private productService: ProductService, private router: Router) {
    this.colorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.productService.getColors().subscribe((data: any) => {
      this.colors = data.color;
    });
  }
  onHandleSubmit() {
    this.submitted = true;
    const formData = { ...this.colorForm.value };
    if (this.colorForm.valid) {
      console.log(formData);
      // Gọi phương thức đăng ký từ ProductService
      this.productService.addColor(formData).subscribe(
        (response) => {
          // Xử lý phản hồi từ API khi đăng ký thành công
          this.router.navigate(['/admin/color']);
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
