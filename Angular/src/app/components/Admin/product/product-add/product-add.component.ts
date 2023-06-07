import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Isize } from 'src/app/interface/size';
import { IColor } from 'src/app/interface/color';
import { ICategory } from 'src/app/interface/category';
import { MessageService } from 'primeng/api';
import { CloudinaryUpload } from 'src/app/configs/uploadCloundinary';
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
  providers: [MessageService, CloudinaryUpload],
})
export class ProductAddComponent {
  sizes!: Isize[];
  colors!: IColor[];
  categorys!: ICategory[];
  productForm!: FormGroup;
  submitted = false;
  files: File[] = [];
  imageUrls: string[] = [];
  showProgressBar: boolean = false;
  value: number = 0;
  constructor(
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService,
    private cloudinaryUpload: CloudinaryUpload
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      size: new FormControl([], [Validators.required]),
      color: new FormControl([], [Validators.required]),
      hot_sale: new FormControl(0),
      categoryId: new FormControl('', [Validators.required]),
      rating: new FormControl(0),
      quantity: new FormControl('', [Validators.required]),
    });
    this.productForm.get('rating')?.clearValidators();
    this.productForm.get('rating')?.setErrors(null);
    this.productForm.get('rating')?.updateValueAndValidity();
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
    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 50) {
        this.value = 100;
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'Image Upload Successfully',
        });
        clearInterval(interval);
      }
    }, 2000);
  }

  //file image

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  uploadFile() {
    if (this.files.length === 0) {
      alert('Vui lòng chọn các tệp ảnh');
      return;
    }
    this.showProgressBar = true;

    const uploadPromises: Promise<any>[] = [];

    for (const file of this.files) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'AsmAngular');
      data.append('cloud_name', 'dpsl2xj1j');

      const uploadPromise = this.cloudinaryUpload.uploadImage(data).toPromise();
      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises)
      .then((results) => {
        this.imageUrls = results.map((result) => result.secure_url);
        console.log('imageUrls', this.imageUrls);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // validate màu

  onHandleSubmit() {
    this.submitted = true;
    const formData = { ...this.productForm.value };
    // Tùy chỉnh giá trị trong formData
    formData.size = formData.size.map((item: Isize) => item.name);
    formData.color = formData.color.map((item: IColor) => item.name);
    formData.image = this.imageUrls;
    if (this.productForm.valid) {
      console.log(formData);
      // Gọi phương thức đăng ký từ ProductService
      this.productService.addProduct(formData).subscribe(
        (response) => {
          // Xử lý phản hồi từ API khi đăng ký thành công
          this.router.navigate(['/admin/products']);
          console.log('Thêm mới thành công', response);
        },
        (error) => {
          // Xử lý lỗi từ API khi đăng ký thất bại
          console.log('Thêm mới thất bại', error);
        }
      );
    }
  }
}
