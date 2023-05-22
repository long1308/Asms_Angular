import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  submitted = false;
  form!: FormGroup;
  loginError = false;
  constructor(private ProductService: ProductService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.ProductService.login(formData).subscribe(
        (response: any) => {
          console.log(response);
          // Lưu thông tin người dùng vào localStorage
          this.loginError = false;
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/']);
        },
        (error) => {
          // Xử lý lỗi từ API khi đăng nhập thất bại
          console.log('Đăng nhập thất bại', error);
          this.loginError = true;
        }
      );
    }
  }
}
