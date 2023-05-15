import { Component, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
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
}
