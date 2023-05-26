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
    this.productService.getOneCart(this.user._id).subscribe((data:any) => {
      // Handle the cart data received from the service
      this.cart = data.cart;
      console.log(data.cart);
    });
  }
  removeItem(item:any){
    console.log(item._id);
    this.productService.deleteCart(this.user._id,item._id).subscribe((data:any)=>{
      this.cart = data.cart;
    })
    
  }
}
