import { Component, OnInit} from '@angular/core';

import { ProductService } from 'src/app/service/product.service';
import { Iproduct } from 'src/app/interface/product';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {

  product: Iproduct = {} as Iproduct;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  onchange(index: number) {
    this.selectedIndex = index;
  }
  nextImage() {
    this.selectedIndex = (this.selectedIndex + 1) % this.productImages.length;
  }
  previousImage() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.productImages.length) %
      this.productImages.length;
  }
  selectedIndex: number = 0;
  productImages: string[] = [
    'https://templateprj.vercel.app/img/products/f1.jpg',
    'https://templateprj.vercel.app/img/products/f2.jpg',
    'https://templateprj.vercel.app/img/products/f3.jpg',
    'https://templateprj.vercel.app/img/products/f4.jpg',
    'https://templateprj.vercel.app/img/products/f5.jpg', 
  ];


  ngOnInit() {
    this.ngOnInit1()
  
    }
    ngOnInit1() {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.productService.getProduct(id!).subscribe((item: any) => {
          this.product = item.product;
          console.log(this.product);
          
        });
      });
    }

}
