import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../interface/product';
import { signup, signin } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  //get All
  getProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>('http://localhost:8080/api/products');
  }
  //get by id
  getProduct(id: number | string): Observable<Iproduct> {
    return this.http.get<Iproduct>('http://localhost:8080/api/products/' + id);
  }
  register(user: signup): Observable<signup> {
    return this.http.post<signup>('http://localhost:8080/api/signup', user);
  }

  login(user: signin): Observable<signin> {
    return this.http.post<signin>('http://localhost:8080/api/signin', user);
  }
  editProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(
      'http://localhost:8080/api/products/' + product._id,
      product
    );
  }

  editPatchProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.patch<Iproduct>(
      'http://localhost:8080/api/products/' + product._id,
      product
    );
  }
  //cart
  getOneCart(id: number | string): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/cart/' + id);
  }
  addCart(product: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/cart', product);
  }
}
