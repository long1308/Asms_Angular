import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
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
  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.productService.getOneCart(this.user._id).subscribe((data: any) => {
      this.cart = data.cart;
      console.log(this.cart);
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
        });
        // const updatedItem = data.cart.items.find(
        //   (cartItem: any) => cartItem._id === item._id
        // );
        // if (updatedItem) {
        //   item.quantity = updatedItem.quantity;
        //   item.price = updatedItem.price;
        //   item.priceSale = updatedItem.priceSale;
        //   // Cập nhật totalPrice và totalPriceSale
        //   this.cart.totalPrice = data.cart.totalPrice;
        //   this.cart.totalpriceSale = data.cart.totalpriceSale;
        // }
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
  first: number = 0;

  rows: number = 10;

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
