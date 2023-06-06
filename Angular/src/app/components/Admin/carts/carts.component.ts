import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent {
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getCarts().subscribe(data => {
      console.log(data);
      
    })
  }
}