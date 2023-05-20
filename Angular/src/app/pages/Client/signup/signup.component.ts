import { Component,OnInit } from '@angular/core';

import { ProductService } from 'src/app/service/product.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent {
  form!: FormGroup;
  includeConfirmPassword: boolean = true;
  successMessage: string = '';


  constructor(private productService: ProductService) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      image_url: new FormControl('https://i.pinimg.com/736x/a0/df/7f/a0df7f01c678ba79c824037b624af53b.jpg', [Validators.required]),
    }, { validators: this.passwordsMatchValidator });
  }

  submitForm(): void {
    if (this.form.valid) {
      if (this.form.controls['confirmPassword'].errors?.['passwordsMatch']) {
        // Mật khẩu không trùng khớp, hiển thị thông báo lỗi
        console.log('Passwords do not match');
      } else {
        // Mật khẩu trùng khớp, gửi dữ liệu đăng ký lên API
        console.log(this.form.value);
        // Gọi phương thức đăng ký từ ProductService
        this.productService.register(this.form.value).subscribe(
          response => {
            // Xử lý phản hồi từ API khi đăng ký thành công
            console.log('Đăng ký thành công', response);
            this.successMessage = 'Đăng ký thành công';
          },
          error => {
            // Xử lý lỗi từ API khi đăng ký thất bại
            console.log('Đăng ký thất bại', error);

          }
        );
      }
    }
  }

  toggleConfirmPassword(): void {
    this.includeConfirmPassword = !this.includeConfirmPassword;
    if (this.includeConfirmPassword) {
      this.form.addControl('confirmPassword', new FormControl('', [Validators.required]));
    } else {
      this.form.removeControl('confirmPassword');
    }
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordsMatch': true };
    }

    return null;
  }
}






