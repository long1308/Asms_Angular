import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  constructor(private route: ActivatedRoute,private countryService: ProductService  ) {}
  searchValue: string = '';
  countries: Iproduct[] = [];
  filteredCountries : Iproduct[] = [];
  isAscending: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.searchValue = params.search;

      this.countryService.getProducts().subscribe((countries: any) => {
        console.log(countries.product);
        this.countries = countries.product.docs;
        // Calculate the total number of pages
        this.totalPages = Math.ceil(this.countries.length / this.itemsPerPage);
        

        if (this.searchValue) {
          this.filteredCountries = this.countries.filter((country: Iproduct) =>
            country.name.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        } else {
          this.filteredCountries = this.countries;
          console.log(this.filteredCountries.length);
   
          
        }
        this.sortProducts();
      });
    });
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPaginatedProducts(): Iproduct[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    return this.countries.slice(startIndex, endIndex);
  }
  sortProducts() {
    if (this.isAscending) {
      this.filteredCountries.sort((a, b) => a.priceSale - b.priceSale);
    } else {
      this.filteredCountries.sort((a, b) => b.priceSale - a.priceSale);
    }
  }

  toggleSortOrder() {
    this.isAscending = !this.isAscending;
    this.sortProducts();
  }

}
