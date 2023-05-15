import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent {
  handleInput(event: KeyboardEvent) {
    this.updateQuantity('input');
    this.handleInputChange(event);
  }
   valueQuantity: number = 1;
   quantity: number = 100;//số lượng sản phẩm còn lại

   handleInputChange(event: KeyboardEvent) {
    // 
 
      if (
        event.key === 'e' ||
        event.key === '.' ||
        event.key === '+' ||
        event.key === '-' ||
        event.key === 'E' ||
        event.key === ' '
      ) {
        event.preventDefault();
      }
    
   
  }
   updateQuantity(action: string) {
    if (action === 'increase' && this.valueQuantity < this.quantity) {
      this.valueQuantity++;
    } else if (action === 'decrease' && this.valueQuantity > 1) {
      this.valueQuantity--;
    }
  }
  


}  




