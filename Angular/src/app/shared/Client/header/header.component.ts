import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }
  ngOnInit() {
    this.renderer.listen('document', 'click', (event: any) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.isMenuVisible = false;
      }
    });
  }
  isMenuVisible:boolean = false;
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}
