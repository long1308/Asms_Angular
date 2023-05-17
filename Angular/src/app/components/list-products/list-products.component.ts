import { Component } from '@angular/core';
import { Iproduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent {
  products: Iproduct[] = [];
  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe((products) => {
      // this.products = products;
      console.log(products);
    });
  }
}
