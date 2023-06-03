import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IColor } from 'src/app/interface/color';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent {
  color!: IColor[];
  colorForm!: FormGroup;
  submitted = false;
  id!: number | string;
  selectedColorIds: number[] = [];
  selectedSizeIds: number[] = [];
  constructor(
    private colorService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.colorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id')!;
      this.colorService.getColors().subscribe((data: any) => {
        this.color = data.color;
        console.log(this.color);
        if (this.color.length > 0) {
          const selectedColor = this.color.find((s) => s._id === this.id);
          if (selectedColor) {
            this.colorForm.patchValue({
              name: selectedColor.name,
            });
          }
        }
      
      });
    });
}
ngOnInit() {
  this.colorService.getSizes().subscribe((data: any) => {
    this.color = data.color;
  });
}
onHandleSubmit() {
  this.submitted = true;
  if (this.colorForm.valid) {
    const formData = { ...this.colorForm.value };
    console.log(formData.name);

    this.colorService.editColor(this.id, formData).subscribe(
      (response) => {
        // Xử lý phản hồi từ API khi sửa thành công
        this.router.navigate(['/admin/color']);
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
