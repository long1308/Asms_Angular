import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  successMessage: string = '';

  form!: FormGroup;
constructor (private ProductService : ProductService) {
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
          console.log('Đăng nhập thành công', response);
          this.successMessage = 'Đăng nhập thành công';

        },
        error => {
          // Xử lý lỗi từ API khi đăng nhập thất bại
          console.log('Đăng nhập thất bại', error);
        }
      );
    }
  }
}
