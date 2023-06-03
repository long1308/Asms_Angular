import { Component, Renderer2, ElementRef } from '@angular/core';
import { ICategory } from 'src/app/interface/category';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef,private countryService: ProductService  ) {}
  user: any = JSON.parse(localStorage.getItem('user')!);
  categorys: ICategory[]= []
  ngOnInit() {
    this.renderer.listen('document', 'click', (event: any) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.isMenuVisible = false;
      }
    });
    this.getCategory()
    console.log(this.user);
  }
  isMenuVisible: boolean = false;
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  getCategory(){
  this.countryService.getCategorys().subscribe((category: ICategory[]) => {
  this.categorys = category


  })
  }
}
