import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products!: Iproduct[];
  nonFeaturedProducts!: Iproduct[];
  featuredProducts!: Iproduct[];

  responsiveOptions!: any[];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProducts().subscribe((products: any) => {
      this.products = products.product.docs;
      this.featuredProducts = this.products.filter(
        (product) => product.featured
      );
      this.nonFeaturedProducts = this.products.filter(
        (product) => !product.featured
      );
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
  // get rating array
  getRatingArray(rating: number, maxRating: number): number[] {
    return Array.from({ length: maxRating }, (_, index) => index + 1);
  }
  //status
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
  // addToFavorites
  isFavorite!: boolean;
  addToFavorites(product: any) {
    this.isFavorite = !product.isFavorite; // Đảo giá trị của biến isFavorite
    console.log(this.isFavorite);
    product.isFavorite = this.isFavorite; // Cập nhật giá trị isFavorite trong đối tượng product
    this.productService.editPatchProduct(product).subscribe(
      (updatedProduct: any) => {
        // Xử lý khi cập nhật sản phẩm thành công
        console.log('Sản phẩm đã được cập nhật:', updatedProduct);
      },
      (error: any) => {
        // Xử lý khi cập nhật sản phẩm gặp lỗi
        console.error('Lỗi khi cập nhật sản phẩm:', error);
      }
    );
  }
}
