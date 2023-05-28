import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interface/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/service/product.service';
import { IColor } from 'src/app/interface/color';
@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
  providers: [MessageService, ConfirmationService],

})
export class ColorComponent implements OnInit {
  colorDialog!: boolean;
  inputValue!: string;
  colors!: IColor[];
  color!: IColor;
  selectedColor!: IColor[];
  submitted!: boolean;
  statuses!: any[];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.productService.getColors().subscribe((data: any) => {
      this.colors = data.color;
    });
  }

  openNew() {
    this.color = {} as IColor;
    this.submitted = false;
    this.colorDialog = true;
  }

  deleteSelectedColor() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected colors?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.colors = this.colors.filter(
          (val) => !this.selectedColor.includes(val)
        );
        this.selectedColor! = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Color Deleted',
          life: 3000,
        });
      },
    });
  }

  editColor(color: IColor) {
    this.color = { ...color };
    this.colorDialog = true;
  }

  deleteColor(color: IColor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + color.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.colors = this.colors.filter((val) => val._id !== color._id);
        this.color = {} as IColor;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Color Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.colorDialog = false;
    this.submitted = false;
  }

  saveColor() {
    this.submitted = true;
    if (this.color.name.trim()) {
      if (this.color._id) {
        this.colors[this.findIndexById(this.color._id.toString())!] = this.color;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Color Updated',
          life: 3000,
        });
      } else {
        this.color._id = this.createId();
        this.colors.push(this.color);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Color Created',
          life: 3000,
        });
      }
      this.colors = [...this.colors];
      this.colorDialog = false;
      this.color = {} as IColor;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i]._id === id) {
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
