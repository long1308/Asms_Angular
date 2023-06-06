import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Paginator } from 'primeng/paginator';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class CartComponent implements OnInit {
  cart: any;
  user: any = JSON.parse(localStorage.getItem('user')!);
   filteredItems: any[] = []
  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService.getOneCart(this.user._id).subscribe((data: any) => {
      this.cart = data.cart;
      this.totalRecords = this.cart.items.length;
      this.loadCartItems(); 
    });
  }
  removeItem(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + item.productId.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService
          .deleteCart(this.user._id, item._id)
          .subscribe((data: any) => {
            // Cập nhật lại số lượng và giá tiền của sản phẩm trong giỏ hàng
            this.productService
              .getOneCart(this.user._id)
              .subscribe((data: any) => {
                // Handle the cart data received from the service
                this.cart = data.cart;
                this.loadCartItems();
                
              });
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: ' Cart Product Deleted Successfuly',
          life: 3000,
        });
      },
    });
  }
  updateQuantity(item: any) {
    this.productService
      .updateCart({
        userId: this.user._id,
        _id: item._id,
        quantity: item.quantity,
      })
      .subscribe((data: any) => {
        // Cập nhật lại số lượng và giá tiền của sản phẩm trong giỏ hàng
        this.productService.getOneCart(this.user._id).subscribe((data: any) => {
          // Handle the cart data received from the service
          this.cart = data.cart;
          this.loadCartItems(); 
        });
      });
  }
  increaseQuantity(item: any) {
    item.quantity++;
    this.updateQuantity(item);
  }
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
    this.updateQuantity(item);
  }

  @ViewChild(Paginator) paginator!: Paginator;
  first = 0;
  rows = 5;
  totalRecords = 0;

  // Phương thức xử lý sự kiện khi thay đổi trang
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    // Gọi lại API hoặc thực hiện các thay đổi cần thiết khi thay đổi trang
    // Ví dụ:
    this.loadCartItems();
  }
  loadCartItems() {
    const startIndex = this.first;
    const endIndex = this.first + this.rows;
    this.filteredItems = this.cart.items.slice(startIndex, endIndex);
  }
  
}
