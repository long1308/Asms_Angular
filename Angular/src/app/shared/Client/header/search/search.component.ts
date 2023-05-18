import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
 @ViewChild('searchInput') searchInput!: ElementRef;
 constructor(private countryService: ProductService) {}
 
 ngOnInit() {
   this.countryService.getProducts().subscribe((countries: any) => {
     this.countries = countries.product;
   });
 }

 filterCountry() {
  this.loading = true; // Hiển thị biểu tượng tải
 // Hiển thị kết quả tìm kiếm
  setTimeout(() => {
    this.filteredCountries = this.countries.filter((country: Iproduct) =>
      country.name.toLowerCase().includes(this.searchValue.toLowerCase())
     
    );
    
 this.showResults = true; 
    
    this.loading = false; // Ẩn biểu tượng tải
  }, 300); // Đợi 0.3s trước khi lọc và hiển thị kết quả

}
// show list dữ liệu search và 
showList(){
this.showResults = true;

}
 hideResults() {
this.showResults = false;
}
 clearSearch() {
  this.searchValue=""
  this.searchInput.nativeElement.focus(); // Focus vào input sau khi xóa nội dung
}

hidenList(){

this.showResults = false;}
 
 
 
 
 

//  filterCountry(event: any) {
//      let filtered: any[] = [];
//      let query = event.query;

//      for (let i = 0; i < this.countries.length; i++) {
//          let country = this.countries[i];
//          if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
//              filtered.push(country);
//          }
//      }
//      console.log(this.filteredCountries);
     

//      this.filteredCountries = filtered;
//  }
//}

}
