import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { Iproduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products-of-categories',
  templateUrl: './products-of-categories.component.html',
  styleUrls: ['./products-of-categories.component.css']
})
export class ProductsOfCategoriesComponent {
products: Iproduct[]= [] 
constructor(private product : ProductService, private route: ActivatedRoute) {}
ngOnInit(){
  this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
  this.product.getOneCategory(id!).subscribe((category: any) => {
  this.products = category.products
  console.log(this.products);
  
  })
  })
}
isFavorite!: boolean;
  addToFavorites(product: any) {
    this.isFavorite = !product.isFavorite; // Đảo giá trị của biến isFavorite
    console.log(this.isFavorite);
    product.isFavorite = this.isFavorite; // Cập nhật giá trị isFavorite trong đối tượng product
    this.product.editPatchProduct(product).subscribe(
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
}
