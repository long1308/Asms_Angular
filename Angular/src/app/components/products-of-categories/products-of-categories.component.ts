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
sortRating: string = 'Đánh giá';
sortPrice: string = 'Giá';
hotsale: any;
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
    // sort
    sortPriceChange(event: any){
  
      this.sortPrice = event.target.value;
      if(this.sortPrice == 'asc'){
        this.products.sort((a, b) => (a.priceSale > b.priceSale ? 1 : -1));
      }
      
      if(this.sortPrice == 'desc'){
        this.products.sort((a, b) => (a.priceSale < b.priceSale ? 1 : -1));
      }
      if (this.sortPrice === 'asc' || this.sortPrice === 'desc') {
        this.sortPrice = ''; // Ẩn tùy chọn "Giá"
      }
      
    }
    sortRatingChange(event: any){
    
      this.sortRating = event.target.value;
      if(this.sortRating == 'asc'){
        this.products.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      }
      
      if(this.sortRating == 'desc'){
        this.products.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      }
      if (this.sortRating === 'asc' || this.sortRating === 'desc') {
        this.sortRating = ''; // Ẩn tùy chọn "Giá"
      }
      
    }
    sortSaleChange(event: any) {
      this.sortRating = event.target.value;
    
      if (this.sortRating === 'asc') {
        this.products.sort((a, b) => {
          if (a.hot_sale === undefined && b.hot_sale === undefined) {
            return 0;
          }
          if (a.hot_sale === undefined) {
            return 1;
          }
          if (b.hot_sale === undefined) {
            return -1;
          }
          return a.hot_sale > b.hot_sale ? 1 : -1;
        });
      }
      
      if (this.sortRating === 'desc') {
        this.products.sort((a, b) => {
          if (a.hot_sale === undefined && b.hot_sale === undefined) {
            return 0;
          }
          if (a.hot_sale === undefined) {
            return 1;
          }
          if (b.hot_sale === undefined) {
            return -1;
          }
          return a.hot_sale < b.hot_sale ? 1 : -1;
        });
      }
      
      if (this.sortRating === 'asc' || this.sortRating === 'desc') {
        this.sortRating = ''; // Ẩn tùy chọn "Giá"
      }
    }
}
