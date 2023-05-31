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
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent {
  sizes!: Isize[];
  colors!: IColor[];
  categorys!: ICategory[];
  productForm!: FormGroup;
  submitted = false;
  constructor(private productService: ProductService, private router: Router) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl(
        [
          'https://templateprj.vercel.app/img/products/f1.jpg',
          'https://templateprj.vercel.app/img/products/f2.jpg',
          'https://templateprj.vercel.app/img/products/f3.jpg',
        ],
        [Validators.required]
      ),
      size: new FormControl([], [Validators.required]),
      color: new FormControl([], [Validators.required]),
      hot_sale: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      rating: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.productService.getSizes().subscribe((data: any) => {
      this.sizes = data.size;
    });
    this.productService.getColors().subscribe((data: any) => {
      this.colors = data.color;
    });
    this.productService.getCategorys().subscribe((data: any) => {
      this.categorys = data;
    });
  }
  onHandleSubmit() {
    this.submitted = true;
    const formData = { ...this.productForm.value };
    // Tùy chỉnh giá trị trong formData
    formData.size = formData.size.map((item: Isize) => item.name);
    formData.color = formData.color.map((item: IColor) => item.name);
    if (this.productForm.valid) {
      console.log(formData);
      // Gọi phương thức đăng ký từ ProductService
      this.productService.addProduct(formData).subscribe(
        (response) => {
          // Xử lý phản hồi từ API khi đăng ký thành công
          this.router.navigate(['/admin/products']);
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
