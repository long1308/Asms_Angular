import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-categoy-edit',
  templateUrl: './categoy-edit.component.html',
  styleUrls: ['./categoy-edit.component.css']
})
export class CategoyEditComponent {
  categoy!: ICategory[];
  categoyForm!: FormGroup;
  submitted = false;
  id!: number | string;
  selectedColorIds: number[] = [];
  selectedSizeIds: number[] = [];
  constructor(
    private categoyService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoyForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    this.route.paramMap.subscribe((param) => { 
      this.id = param.get('id')!;
      console.log(this.id);
      
      this.categoyService.getCategorys().subscribe((data: any) => {
        console.log(data);
        
        this.categoy = data;
        console.log(this.categoy);
        if (this.categoy.length > 0) {
          const selectedCategoy = this.categoy.find((s) => s._id === this.id);
          console.log(this.id);
          
          if (selectedCategoy) {
            this.categoyForm.patchValue({
              name: selectedCategoy.name,
            });
          }
        }
      
      });
    });
}
ngOnInit() {
  this.categoyService.getCategorys().subscribe((data: any) => {
    this.categoy = data.categoy;
  });
}
onHandleSubmit() {
  this.submitted = true;
  if (this.categoyForm.valid) {
    const formData = { ...this.categoyForm.value };
    console.log(formData.name);

    this.categoyService.editCategorys(this.id, formData).subscribe(
      (response) => {
        // Xử lý phản hồi từ API khi sửa thành công
        this.router.navigate(['/admin/categorys']);
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
