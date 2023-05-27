import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user')!);
  constructor(private productService: ProductService) {}
  cart: any;
  ngOnInit() {
    this.productService.getOneCart(this.user._id).subscribe((data: any) => {
      // Handle the cart data received from the service
      this.cart = data.cart;
    });
  }
  removeItem(item: any) {
    console.log(item._id);
    this.productService
      .deleteCart(this.user._id, item._id)
      .subscribe((data: any) => {
        this.cart = data.cart;
      });
  }
  updateQuantity(item: any) {
    // Thực hiện các hoạt động cập nhật dữ liệu ở đây
    // Ví dụ: Gọi API để cập nhật số lượng sản phẩm trong giỏ hàng
    // hoặc thực hiện các xử lý logic khác tương ứng với yêu cầu của bạn
    this.productService
      .updateCart({
        userId: this.user._id,
        _id: item._id,
        quantity: item.quantity,
      })
      .subscribe((data: any) => {
        console.log(data);
        
        const updatedItem = data.cart.items.find(
          (cartItem: any) => cartItem._id === item._id
        );
        if (updatedItem) {
          item.quantity = updatedItem.quantity;
          item.price = updatedItem.price;
          item.priceSale = updatedItem.priceSale;
          // Cập nhật totalPrice và totalPriceSale
          this.cart.totalPrice = data.cart.totalPrice;
          this.cart.totalpriceSale = data.cart.totalpriceSale;
        }
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

  onPageChange(event:any) {
      this.first = event.first;
      this.rows = event.rows;
  }
}
