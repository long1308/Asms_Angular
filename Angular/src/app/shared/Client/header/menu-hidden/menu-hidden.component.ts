import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-hidden',
  templateUrl: './menu-hidden.component.html',
  styleUrls: ['./menu-hidden.component.css']
})
export class MenuHiddenComponent {
  isMenuVisible:boolean = true;
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  } 
}
