import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interface/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ListProductComponent implements OnInit {
  productDialog!: boolean;
  inputValue!: string;
  products!: Iproduct[];
  product!: Iproduct;
  selectedProducts: Iproduct[] = [];
  submitted!: boolean;
  statuses!: any[];
  uploadedFiles: any[] = []; // image upload
  isVisible!: boolean;
  checkedfeatured!: boolean;
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.product.docs;
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];
  }
  deleteSelectedProducts() {
    console.log(this.selectedProducts);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Lặp qua các sản phẩm đã chọn để xóa từ cơ sở dữ liệu
        for (const product of this.selectedProducts) {
          this.productService.deleteProduct(product._id!).subscribe(() => {
            // Xóa sản phẩm khỏi danh sách products sau khi xóa thành công trong cơ sở dữ liệu
            this.products = this.products.filter((p) => p._id !== product._id);
          });
        }

        // Xóa danh sách sản phẩm đã chọn
        this.selectedProducts = [];

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  deleteProduct(product: Iproduct) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(product._id!).subscribe((data) => {
          this.productService.getProducts().subscribe((data: any) => {
            this.products = data.product.docs;
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
    this.productDialog = false;
    this.submitted = false;
  }

  // status
  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return ''; // Giá trị mặc định hoặc giá trị xử lý trường hợp không xác định
    }
  }
  //search
  search() {
    console.log(this.inputValue); // In giá trị của input ra console
    // Thực hiện các tác vụ khác với giá trị của input
  }
  //file image
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
  //hide/ show
  updateProductVisible(product: Iproduct) {
    this.isVisible = !product.isVisible; // Đảo giá trị của biến isFavorite
    console.log(this.isVisible);
    // this.productService.editPatchProduct(product).subscribe(() => {
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Successful',
    //     detail: 'Product Status Updated',
    //     life: 3000,
    //   });
    // });
  }
}
