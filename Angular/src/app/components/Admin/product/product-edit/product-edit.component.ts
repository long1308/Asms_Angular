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
import { MessageService } from 'primeng/api';
import { CloudinaryUpload } from 'src/app/configs/uploadCloundinary';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers: [MessageService, CloudinaryUpload],
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
  //upload
  files: File[] = [];
  imageUrls: string[] = [];
  showProgressBar: boolean = false;
  value: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cloudinaryUpload: CloudinaryUpload
  ) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
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

        this.productForm.patchValue(this.product);
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
    formData.image = this.imageUrls;
    if (this.productForm.valid) {
      console.log(formData);
      // Gọi phương thức đăng ký từ ProductService
      this.productService.editProduct(this.id, formData).subscribe(
        (response) => {
          // Xử lý phản hồi từ API khi đăng ký thành công
          this.router.navigate(['/admin/products']);
          console.log('Sửa Thành công', response);
        },
        (error) => {
          // Xử lý lỗi từ API khi đăng ký thất bại
          console.log('Sửa Thành thất bại', error);
        }
      );
    }
  }
}
