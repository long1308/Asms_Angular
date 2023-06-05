import { Component, Renderer2, ElementRef } from '@angular/core';
import { ICategory } from 'src/app/interface/category';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private countryService: ProductService,
    private router: Router,
  ) {}
  user: any = JSON.parse(localStorage.getItem('user')!);
  categorys: ICategory[] = [];
  ngOnInit() {
    this.renderer.listen('document', 'click', (event: any) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.isMenuVisible = false;
      }
    });
    this.getCategory();
    console.log(this.user);
  }
  isMenuVisible: boolean = false;
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  getCategory() {
    this.countryService.getCategorys().subscribe((category: ICategory[]) => {
      this.categorys = category;
    });
  }
  logout() {
    // Xóa hết dữ liệu trong localstorage
    localStorage.clear(); // Hoặc bạn có thể xóa từng key một nếu muốn giữ lại một số dữ liệu

    // Chuyển hướng đến trang đăng nhập
    this.router.navigate(['/signin']);
  }
}
