import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Iproduct } from 'src/app/interface/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  handleInput(event: KeyboardEvent) {
    this.updateQuantity('input');
    this.handleInputChange(event);
  }
  valueQuantity: number = 1;
  isInputEmpty: boolean = true;

  //số lượng sản phẩm còn lại

  handleInputChange(event: KeyboardEvent) {
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
  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
  }
  checkInputEmpty() {
    this.isInputEmpty =
      isNaN(this.valueQuantity) ||
      this.valueQuantity === null ||
      this.valueQuantity === undefined;
  }
  updateQuantity(action: string) {
    if (action === 'increase' && this.valueQuantity < this.product.quantity) {
      this.valueQuantity++;
    } else if (action === 'decrease' && this.valueQuantity > 1) {
      this.valueQuantity--;
    }
  }
  //grt product
  product: Iproduct = {} as Iproduct;

  ngOnInit() {
    this.ngOnInit1();
    this.ngOnInit2();
  }
  ngOnInit1() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id!).subscribe((products: any) => {
        this.product = products.product;
      });
    });
  }
  productsAll: Iproduct[] = [];
  responsiveOptions!: any[];
  ngOnInit2() {
    this.productService.getProducts().subscribe((products: any) => {
      this.productsAll = products.product.docs;
    });
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
  selectedIndex: number = 0;
  clickColor(index: number) {
    this.selectedIndex = index;
  }
  //status
  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return ''; // Giá trị mặc định hoặc giá trị xử lý trường hợp không xác định
    }
  }
  // get rating array
getRatingArray(rating: number, maxRating: number): number[] {
  return Array.from({ length: maxRating }, (_, index) => index + 1);
}
}
