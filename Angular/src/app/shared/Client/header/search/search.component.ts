import { Component, OnInit, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  showDetail: boolean = false;
 searchValue: string = '';
 countries: Iproduct[] = [];
 filteredCountries: Iproduct[] = [];
 showResults: boolean = false;
 clear: boolean = false;
 loading: boolean = false;
 timeoutId: any;
 @ViewChild('searchInput') searchInput!: ElementRef;
 constructor(private countryService: ProductService , private router: Router,private renderer: Renderer2, private elementRef: ElementRef) {}

 ngOnInit() {// Lấy dữ liệu
   this.countryService.getProducts().subscribe((countries: any) => {
     this.countries = countries.product.docs;
   });
   this.onClick()
 }

 onClick(){
  this.renderer.listen('document', 'click', (event: any) => {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showResults = false;
    }
  });
}

 onSearch() { // Submit khi tìm kiếm và chuyển đến trang Shop
  this.filteredCountries = this.countries.filter((country: Iproduct) => {
    return country.name.toLowerCase().includes(this.searchValue.toLowerCase());
  });

  this.showResults = false;
  this.router.navigate(['/shop'], {
    queryParams: { search: this.searchValue },
    queryParamsHandling: 'merge'
  });
}

 filterCountry() {// Lấy dữ liệu theo từ khóa 
  this.loading = true; // Hiển thị biểu tượng tải
 // Hiển thị kết quả tìm kiếm
 clearTimeout(this.timeoutId); // Hủy timeout trước nếu có

 this.timeoutId = setTimeout(() => {
    this.filteredCountries = this.countries.filter((country: Iproduct) =>
      country.name.toLowerCase().includes(this.searchValue.toLowerCase())
    )
 this.showResults = true; // show dữ liệu sau khi tìm
    this.loading = false; // Ẩn biểu tượng tải
  }, 300); // Đợi 0.3s trước khi lọc và hiển thị kết quả
}

showList(){ // show list dữ liệu search 
this.showResults = true;

}

hidenList(){ // ẩn list dữ liệu search

  this.showResults = false;}

 clearSearch() {  // Xóa value và focus vào input
  this.searchValue=""
  this.searchInput.nativeElement.focus(); // Focus vào input sau khi xóa nội dung
}


 

}
