import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductService } from 'src/app/service/product.service';
import { Iproduct } from 'src/app/interface/product';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() value: Iproduct = {} as Iproduct;
  @Input() selectedIndex: number = 0;
  @Output() srcChange = new EventEmitter<string>();
  product: Iproduct = {} as Iproduct;
  notColor: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  onchange(index: number) {
    this.selectedIndex = index;
  }
  nextImage() {
    this.selectedIndex = (this.selectedIndex + 1) % this.value.image.length;
  }
  previousImage() {
    this.selectedIndex =
      (this.selectedIndex - 1 + this.value.image.length) %
      this.value.image.length;
  }
  ngOnInit() {
    this.ngOnInit1();
    
  }
  ngOnInit1() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id!).subscribe((item: any) => {
        this.product = item.product;
        this.selectedIndex = 0;
      });
    });
  }
  // gửi sự kiện emit lên cha
  sendSrc(src: string) {
    console.log(src);
    
    this.srcChange.emit(src);
  }
}
