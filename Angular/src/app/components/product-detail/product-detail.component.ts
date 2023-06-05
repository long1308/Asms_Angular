import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { Iproduct } from 'src/app/interface/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ICategory } from 'src/app/interface/category';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService],
})
export class ProductDetailComponent implements OnInit {
  productsAll!: Iproduct[];
  responsiveOptions!: any[];
  valueQuantity: number = 1;
  isInputEmpty: boolean = true;
  // call api lấy product
  product!: Iproduct;
  //lấu màu và size
  selectedSize!: string;
  selectedColor!: string;
  //sản phẩm mới
  nonFeaturedProducts!: Iproduct[];
  selectedIndex: number = 0;
  // lấy category so sánh
  categorys: ICategory[] = [];
  nameCategory: any;
  idCategory: any;
  //lấy user localStorage

  user: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private messageService: MessageService
  ) {}
  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Add Product Successfully',
    });
  }
  handleInput(event: KeyboardEvent) {
    this.updateQuantity('input');
    this.handleInputChange(event);
  }
  //validate input
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
  //validate k past
  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
  }
  // k rỗng
  checkInputEmpty() {
    this.isInputEmpty =
      isNaN(this.valueQuantity) ||
      this.valueQuantity === null ||
      this.valueQuantity === undefined;
  }
  //tăng giả quantity
  updateQuantity(action: string) {
    if (action === 'increase' && this.valueQuantity < this.product.quantity) {
      this.valueQuantity++;
    } else if (action === 'decrease' && this.valueQuantity > 1) {
      this.valueQuantity--;
    }
  }
  ngOnInit() {
    this.ngOnInit1();
    this.ngOnInit2();
    this.nameCate();
  }
  ngOnInit1() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id!).subscribe((products: any) => {
        this.product = products.product;
        this.valueQuantity = 1;
        this.productService
          .getCategorys()
          .subscribe((categorys: ICategory[]) => {
            this.categorys = categorys;
            this.categorys.map((category: ICategory) => {
              if (this.product.categoryId === category._id) {
                this.nameCategory = category.name;
                this.idCategory = category._id;
              }
            });
          });
      });
    });
  }

  ngOnInit2() {
    this.productService.getProducts().subscribe((products: any) => {
      this.productsAll = products.product.docs;
      this.nonFeaturedProducts = this.productsAll.filter(
        (product) => !product.featured && product.isVisible
      );
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
  onTop() {
    window.scroll(0, 0);
  }
  clickSize(index: number) {
    this.selectedSize = this.product.size[index];
  }
  clickColor(index: number) {
    this.selectedIndex = index;
    this.selectedColor = this.product.color[index];
  }
  srcFromChild!: string;
  updateSrc(src: any) {
    this.srcFromChild = src;
  }

  addToCart(product: Iproduct) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    const newItem = {
      userId: this.user._id,
      items: [
        {
          productId: product._id,
          size: [this.selectedSize ? this.selectedSize : product.size[0]],
          color: [this.selectedColor ? this.selectedColor : product.color[0]],
          image: [this.srcFromChild ? this.srcFromChild : product.image[0]],
          quantity: this.valueQuantity,
        },
      ],
    };
    console.log('Cart:', newItem);
    console.log('valueQuantity:', this.valueQuantity);
    this.productService.addCart(newItem).subscribe((data) => {
      console.log(data);
    });
    // this.router.navigate(['/cart']);
  }
  // addToFavorites
  isFavorite!: boolean;
  addToFavorites(product: any) {
    this.isFavorite = !product.isFavorite; // Đảo giá trị của biến isFavorite
    console.log(this.isFavorite);
    product.isFavorite = this.isFavorite; // Cập nhật giá trị isFavorite trong đối tượng product
    this.productService.editPatchProduct(product).subscribe(
      (updatedProduct: any) => {
        // Xử lý khi cập nhật sản phẩm thành công
        console.log('Sản phẩm đã được cập nhật:', updatedProduct);
      },
      (error: any) => {
        // Xử lý khi cập nhật sản phẩm gặp lỗi
        console.error('Lỗi khi cập nhật sản phẩm:', error);
      }
    );
  }
  //name cate
  nameCate() {}
}
