import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interface/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/service/product.service';
import { ICategory } from 'src/app/interface/category';
@Component({
  selector: 'app-categoy',
  templateUrl: './categoy.component.html',
  styleUrls: ['./categoy.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CategoyComponent implements OnInit {
  categoryDialog!: boolean;
  inputValue!: string;
  categorys!: ICategory[];
  category!: ICategory;
  selectedCategorys!: ICategory[];
  submitted!: boolean;
  statuses!: any[];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.productService.getCategorys().subscribe((data: any) => {
      this.categorys = data;
      console.log(data);
      
      console.log(this.categorys);
    });
  }

  openNew() {
    this.category = {} as ICategory;
    this.submitted = false;
    this.categoryDialog = true;
  }

  deleteSelectedCategorys() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected categorys?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categorys = this.categorys.filter(
          (val) => !this.selectedCategorys.includes(val)
        );
        this.selectedCategorys! = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category Deleted',
          life: 3000,
        });
      },
    });
  }

  editCategory(category: ICategory) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category: ICategory) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + category.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categorys = this.categorys.filter(
          (val) => val._id !== category._id
        );
        this.category = {} as ICategory;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveCategory() {
    this.submitted = true;
    if (this.category.name.trim()) {
      if (this.category._id) {
        this.categorys[this.findIndexById(this.category._id.toString())!] =
          this.category;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category Updated',
          life: 3000,
        });
      } else {
        this.category._id = this.createId();
        this.categorys.push(this.category);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Category Created',
          life: 3000,
        });
      }
      this.categorys = [...this.categorys];
      this.categoryDialog = false;
      this.category = {} as ICategory;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.categorys.length; i++) {
      if (this.categorys[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  search() {
    console.log(this.inputValue); // In giá trị của input ra console
    // Thực hiện các tác vụ khác với giá trị của input
  }
}
