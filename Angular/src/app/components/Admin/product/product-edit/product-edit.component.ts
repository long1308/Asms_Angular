import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { IColor } from 'src/app/interface/color';
import { Isize } from 'src/app/interface/size';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/interface/product';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent {
  product!: Iproduct;
  sizes!: Isize[];
  colors!: IColor[];
  categorys!: ICategory[];
  productForm!: FormGroup;
  submitted = false;
  id!: number | string;
  selectedColorIds: number[] = [];
  selectedSizeIds: number[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id')!;
      this.productService.getProduct(this.id).subscribe((data: any) => {
        // Sản phẩm dựa theo ID
        this.product = data.product;
        console.log(this.product);

        this.productForm.patchValue({
          name: this.product.name,
          price: this.product.price,
          description: this.product.description,
          hot_sale: this.product.hot_sale,
          categoryId: this.product.categoryId,
          rating: this.product.rating,
          quantity: this.product.quantity,
        });
      });
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
    formData.size = formData.size
      .filter((item: Isize | null) => item !== null)
      .map((item: Isize) => item.name);
    formData.color = formData.color
      .filter((item: IColor | null) => item !== null)
      .map((item: IColor) => item.name);

    if (this.productForm.valid) {
      console.log(formData);
      // Gọi phương thức đăng ký từ ProductService
      this.productService.editProduct(this.id, formData).subscribe(
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
