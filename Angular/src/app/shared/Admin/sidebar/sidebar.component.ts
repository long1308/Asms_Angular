import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router) {}
  @ViewChild('sidebar') sidebar!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.sidebar.nativeElement.contains(event.target)) {
      this.toggleSidebar();
    }
  }

  toggleSidebar() {
    const sidebarElement: HTMLElement = this.sidebar.nativeElement;
    sidebarElement.classList.toggle('translate-x-0');
  }
  logout() {
    // Xóa hết dữ liệu trong localstorage
    localStorage.clear(); // Hoặc bạn có thể xóa từng key một nếu muốn giữ lại một số dữ liệu

    // Chuyển hướng đến trang đăng nhập
    this.router.navigate(['/signin']);
  }
}
