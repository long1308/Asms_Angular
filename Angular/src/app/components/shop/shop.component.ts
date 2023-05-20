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
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.searchValue = params.search;

      this.countryService.getProducts().subscribe((countries: any) => {
        this.countries = countries.product;

        if (this.searchValue) {
          this.filteredCountries = this.countries.filter((country: Iproduct) =>
            country.name.toLowerCase().includes(this.searchValue.toLowerCase())
          );
        } else {
          this.filteredCountries = this.countries;
        }
        this.sortProducts();
      });
    });
  }
  sortProducts() {
    if (this.isAscending) {
      this.filteredCountries.sort((a, b) => a.price - b.price);
    } else {
      this.filteredCountries.sort((a, b) => b.price - a.price);
    }
  }

  toggleSortOrder() {
    this.isAscending = !this.isAscending;
    this.sortProducts();
  }

}
