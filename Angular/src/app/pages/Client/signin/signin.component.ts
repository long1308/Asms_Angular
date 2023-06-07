import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitForm(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;
    this.productService.login(formData).subscribe(
      (response: any) => {
        console.log("response",response);
        this.loginError = false;
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', JSON.stringify(response.accessToken));
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Đăng nhập thất bại', error);
        this.loginError = true;
      }
    );
  }
}