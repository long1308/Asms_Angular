import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interface/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/service/product.service';
import { Isize } from 'src/app/interface/size';
import { Router } from '@angular/router';
@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class SizeComponent implements OnInit {
  sizeDialog!: boolean;
  inputValue!: string;
  sizes!: Isize[];
  size!: Isize;
  selectedSize!: Isize[];
  submitted!: boolean;
  statuses!: any[];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getSizes().subscribe((data: any) => {
      this.sizes = data.size;
    });
  }

  openNew() {
    this.size = {} as Isize;
    this.submitted = false;
    this.sizeDialog = true;
  }

  deleteSelectedSizes() {
    console.log(this.selectedSize);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Create an array of selected size IDs
        const selectedSizeIds = this.selectedSize.map((size) => size._id);
  
        // Delete the selected sizes from the database
        for (const size of this.selectedSize) {
          this.productService.deleteSize(size._id!).subscribe(() => {
            // Filter out the deleted sizes from the sizes array
            this.sizes = this.sizes.filter((p) => !selectedSizeIds.includes(p._id));
          });
        }
        // Clear the selected sizes array
        this.selectedSize = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editSize(size: Isize) {
    this.size = { ...size };
    this.sizeDialog = true;
  }

  deleteSize(size: Isize) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + size.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteSize(size._id!).subscribe((data) => {
          this.productService.getSizes().subscribe((data: any) => {
            this.sizes = data.size;     
          });
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.sizeDialog = false;
    this.submitted = false;
  }

  saveSize() {
    this.submitted = true;
    if (this.size.name.trim()) {
      if (this.size._id) {
        this.sizes[this.findIndexById(this.size._id.toString())!] = this.size;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Size Updated',
          life: 3000,
        });
      } else {
        this.size._id = this.createId();
        this.sizes.push(this.size);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Size Created',
          life: 3000,
        });
      }
      this.sizes = [...this.sizes];
      this.sizeDialog = false;
      this.size = {} as Isize;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.sizes.length; i++) {
      if (this.sizes[i]._id === id) {
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
