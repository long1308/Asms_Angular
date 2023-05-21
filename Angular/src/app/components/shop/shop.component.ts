import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(private productService: ProductService) {}
  products: Iproduct[] = [];

  itemsPerPage!: number;
  currentPage: number = 1;
  totalRecords: number = 0;
  rowsPerPageOptions: number[] = [5, 10, 20];

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      console.log(data.product);
      this.products = data.product.docs;
      this.totalRecords = data.product.totalDocs;
      this.itemsPerPage = data.product.limit;
      console.log(this.totalRecords);
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.itemsPerPage = event.rows;
  }
  // get rating array
getRatingArray(rating: number, maxRating: number): number[] {
  return Array.from({ length: maxRating }, (_, index) => index + 1);
}

}
