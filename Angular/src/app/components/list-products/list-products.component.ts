import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products: Iproduct[] = [];

  responsiveOptions!: any[];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products.product;
      console.log(this.products);
    });
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  // getSeverity(status: string | undefined): string {
  //   if (status === undefined) {
  //     // Xử lý khi inventoryStatus là undefined, ví dụ:
  //     return 'default';
  //   } else {
  //     switch (status) {
  //       case 'INSTOCK':
  //           return 'success';
  //       case 'LOWSTOCK':
  //           return 'warning';
  //       case 'OUTOFSTOCK':
  //           return 'danger';
  //   }
  //     // Xử lý khi inventoryStatus có giá trị, ví dụ:
  //     // return '...'; (trả về giá trị tương ứng với inventoryStatus)
  //   }
  // }
}
