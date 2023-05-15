import { Component, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  onchange(index: number) {
    this.selectedIndex = index;

  }
  
  nextImage() {
    this.selectedIndex = (this.selectedIndex + 1) % this.productImages.length;
  }
  
  previousImage() {
    this.selectedIndex = (this.selectedIndex - 1 + this.productImages.length) % this.productImages.length;
  }
  selectedIndex:number = 0;
  productImages: string[] = [
    "https://shopgiayreplica.com/wp-content/uploads/2021/07/top-giay-sneaker-hot-2021-rotated.jpg",
    'https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-nen-dong-anime.gif',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://www.hdnicewallpapers.com/Walls/Big/Cat/Beautiful_Cat_Imge_Download.jpg',
    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    
 
    
  ];

  
}
