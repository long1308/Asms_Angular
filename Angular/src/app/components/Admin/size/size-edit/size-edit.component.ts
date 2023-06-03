import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Isize } from 'src/app/interface/size';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-size-edit',
  templateUrl: './size-edit.component.html',
  styleUrls: ['./size-edit.component.css']
})
export class SizeEditComponent {
  size!: Isize[];
  sizeForm!: FormGroup;
  submitted = false;
  id!: number | string;
  selectedColorIds: number[] = [];
  selectedSizeIds: number[] = [];
  constructor(
    private sizeService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.sizeForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id')!;
      this.sizeService.getSizes().subscribe((data: any) => {
        this.size = data.size;
        console.log(this.size);
        if (this.size.length > 0) {
          const selectedSize = this.size.find((s) => s._id === this.id);
          if (selectedSize) {
            this.sizeForm.patchValue({
              name: selectedSize.name,
            });
          }
        }
      
      });
    });
}
ngOnInit() {
  this.sizeService.getSizes().subscribe((data: any) => {
    this.size = data.size;
  });
}
onHandleSubmit() {
  this.submitted = true;
  if (this.sizeForm.valid) {
    const formData = { ...this.sizeForm.value };
    console.log(formData.name);

    this.sizeService.editSize(this.id, formData).subscribe(
      (response) => {
        // Xử lý phản hồi từ API khi sửa thành công
        this.router.navigate(['/admin/size']);
        console.log('Sửa thành công', response);
      },
      (error) => {
        // Xử lý lỗi từ API khi sửa thất bại
        console.log('Sửa thất bại', error);
      }
    );
  }
}
}
