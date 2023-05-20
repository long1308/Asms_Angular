import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import {FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  submitted = false;
  form!: FormGroup;
constructor (private ProductService : ProductService, private router: Router) {
  this.form = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
}


  submitForm(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.ProductService.login(formData).subscribe(
        response => {
          // Xử lý phản hồi từ API khi đăng nhập thành công
          this.router.navigate(['/']);
          console.log('Đăng nhập thành công', response);
        },
        error => {
          // Xử lý lỗi từ API khi đăng nhập thất bại
          console.log('Đăng nhập thất bại', error);
        }
      );
    }
  }
}
