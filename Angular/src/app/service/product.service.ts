import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../interface/product';
import { signup, signin } from '../interface/user';
import { Isize } from '../interface/size';
import { IColor } from '../interface/color';
import { ICategory } from '../interface/category';
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
  editPatchProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.patch<Iproduct>(
      'http://localhost:8080/api/products/' + product._id,
      product
    );
  }
  updateProduct(product: Iproduct, _id: number | string): Observable<Iproduct> {
    return this.http.put<Iproduct>(
      'http://localhost:8080/api/products/' + _id,
      product
    );
  }
  deleteProduct(id: number | string): Observable<Iproduct> {
    return this.http.delete<Iproduct>(
      'http://localhost:8080/api/products/' + id
    );
  }
  addProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.post<Iproduct>(
      'http://localhost:8080/api/products/',
      product
    );
  }
  register(user: signup): Observable<signup> {
    return this.http.post<signup>('http://localhost:8080/api/signup', user);
  }

  login(user: signin): Observable<signin> {
    return this.http.post<signin>('http://localhost:8080/api/signin', user);
  }
  editProduct(id: number | string, product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(
      'http://localhost:8080/api/products/' + id,
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
  deleteCart(
    idUser: number | string,
    idProduct: number | string
  ): Observable<any> {
    return this.http.delete<any>(
      `http://localhost:8080/api/cart/${idUser}/products/${idProduct}`
    );
  }
  updateCart(data: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/api/cart/${data.userId}`,
      data
    );
  }
  //size
  getSizes(): Observable<Isize[]> {
    return this.http.get<Isize[]>('http://localhost:8080/api/size');
  }
  //color
  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>('http://localhost:8080/api/color');
  }
  //categorys
  getCategorys(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/api/categorys');
  }
}
