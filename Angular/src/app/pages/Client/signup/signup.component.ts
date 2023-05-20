import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  form!: FormGroup;
  submitted = false;
  constructor(private productService: ProductService, private router: Router) {
    this.form = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        image_url: new FormControl(
          'https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-6/325451376_712982000435245_1446350167577898312_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=M4jcyS8FMT8AX_hn7UD&_nc_ht=scontent.fhan3-5.fna&oh=00_AfBUDMaTCM1UU_u5ZCCOHMjMdOVJaADYmepZujkdoLFwFA&oe=646E7366',
          [Validators.required]
        ),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  submitForm(): void {
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.form.value);
      // Gọi phương thức đăng ký từ ProductService
      this.productService.register(this.form.value).subscribe(
        (response) => {
          // Xử lý phản hồi từ API khi đăng ký thành công
          this.router.navigate(['/signin']);
          console.log('Đăng ký thành công', response);
        },
        (error) => {
          // Xử lý lỗi từ API khi đăng ký thất bại
          console.log('Đăng ký thất bại', error);
        }
      );
    }
  }
  //error
  // Custom validator function to check if password and confirmPassword match
  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
