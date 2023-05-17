import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/Client/header/header.component';
import { FooterComponent } from './shared/Client/footer/footer.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ContainerComponent } from './pages/Client/container/container.component';
import { SignupComponent } from './pages/Client/signup/signup.component';
import { SigninComponent } from './pages/Client/signin/signin.component';
import { NotfoundComponent } from './components/not-found/notfound.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CarouselComponent } from './components/product-detail/carousel/carousel.component';
import { BannerComponent } from './components/banner/banner.component';
import { ShopComponent } from './components/shop/shop.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListProductsComponent,
    ProductDetailComponent,
    ContainerComponent,
    SignupComponent,
    SigninComponent,
    NotfoundComponent,
    TestimonialsComponent,
    CarouselComponent,
    BannerComponent,
    ShopComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    CartComponent,
    AccountComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
