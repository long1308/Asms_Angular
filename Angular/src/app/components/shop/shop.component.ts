import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  products: Iproduct[] = [];
  filteredCountries: Iproduct[] = [];
  itemsPerPage!: number;
  currentPage: number = 1;
  totalRecords: number = 0;
  rowsPerPageOptions: number[] = [5, 10, 20];
  searchValue: string = '';
  sortPrice: string = 'Giá';
  sortRating: string = 'Đánh giá';

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.searchValue = params.search;
      this.productService.getProducts().subscribe((data: any) => {
        this.products = data.product.docs;
        this.totalRecords = data.product.totalDocs;
        this.itemsPerPage = data.product.limit;
        if (this.searchValue) {
          this.filteredCountries = this.products.filter((country: Iproduct) =>
            country.name.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        } else {
          this.filteredCountries = this.products;
        }
      });
    });

  }
  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.itemsPerPage = event.rows;
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
  // get rating array
  getRatingArray(rating: number, maxRating: number): number[] {
    return Array.from({ length: maxRating }, (_, index) => index + 1);
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
  // sort
  sortPriceChange(event: any){
  
    this.sortPrice = event.target.value;
    if(this.sortPrice == 'asc'){
      this.filteredCountries.sort((a, b) => (a.priceSale > b.priceSale ? 1 : -1));
    }
    
    if(this.sortPrice == 'desc'){
      this.filteredCountries.sort((a, b) => (a.priceSale < b.priceSale ? 1 : -1));
    }
    if (this.sortPrice === 'asc' || this.sortPrice === 'desc') {
      this.sortPrice = ''; // Ẩn tùy chọn "Giá"
    }
    
  }
  sortRatingChange(event: any){
  
    this.sortRating = event.target.value;
    if(this.sortRating == 'asc'){
      this.filteredCountries.sort((a, b) => (a.rating > b.rating ? 1 : -1));
    }
    
    if(this.sortRating == 'desc'){
      this.filteredCountries.sort((a, b) => (a.rating < b.rating ? 1 : -1));
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
