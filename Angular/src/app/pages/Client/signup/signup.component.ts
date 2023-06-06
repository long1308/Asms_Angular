import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  messages2!: Message[];
  error: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
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
          'https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-1/325451376_712982000435245_1446350167577898312_n.jpg?stp=dst-jpg_s320x320&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=yeQlZn6bY_8AX-Svu0g&_nc_ht=scontent.fhan5-2.fna&oh=00_AfC9qwYHo2HZUTs7TGwyk6WV2wvrXOtq3zfKoOQ8OajU0Q&oe=6482E3A4',
          [Validators.required]
        ),
      },
      { validators: this.passwordMatchValidator }
    );
    this.messages2 = [
      {
        severity: 'error',
        summary: 'Error',
        detail: 'Email already exists!',
      },
    ];
  }

  submitForm(): void {
    this.submitted = true;

    if (this.form.valid) {
      console.log(this.form.value);
      this.productService.register(this.form.value).subscribe(
        (response) => {
          this.router.navigate(['/signin']);
          console.log('Đăng ký thành công', response);
        },
        (error) => {
          console.log('Đăng ký thất bại', error);
          this.error = true;
        }
      );
    }
  }

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
