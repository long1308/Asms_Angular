import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
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
}
