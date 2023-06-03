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
  updateProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(
      'http://localhost:8080/api/products/' + product._id,
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
  getCarts(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/cart/');
  }
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

  updateSize(size: Isize, _id: number | string): Observable<Isize> {
    return this.http.put<Isize>('http://localhost:8080/api/size/' + _id, size);
  }
  deleteSize(id: number | string): Observable<Isize> {
    return this.http.delete<Isize>('http://localhost:8080/api/size/' + id);
  }
  addSize(size: Isize): Observable<Isize> {
    return this.http.post<Isize>('http://localhost:8080/api/size/', size);
  }
  editPatchSize(size: Isize): Observable<Isize> {
    return this.http.patch<Isize>(
      'http://localhost:8080/api/size/' + size._id,
      size
    );
  }
  editSize(id: number | string, size: Isize): Observable<Isize> {
    return this.http.put<Isize>('http://localhost:8080/api/size/' + id, size);
  }
  //color
  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>('http://localhost:8080/api/color');
  }
  updateColor(color: IColor, _id: number | string): Observable<IColor> {
    return this.http.put<IColor>(
      'http://localhost:8080/api/color/' + _id,
      color
    );
  }
  deleteColor(id: number | string): Observable<IColor> {
    return this.http.delete<IColor>('http://localhost:8080/api/color/' + id);
  }
  addColor(color: IColor): Observable<IColor> {
    return this.http.post<IColor>('http://localhost:8080/api/color/', color);
  }
  editPatchColor(color: IColor): Observable<IColor> {
    return this.http.patch<IColor>(
      'http://localhost:8080/api/color/' + color._id,
      color
    );
  }
  editColor(id: number | string, color: IColor): Observable<IColor> {
    return this.http.put<IColor>(
      'http://localhost:8080/api/color/' + id,
      color
    );
  }
  //categorys
  getCategorys(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/api/categorys');
  }
  updateCategorys(
    category: ICategory,
    _id: number | string
  ): Observable<ICategory> {
    return this.http.put<ICategory>(
      'http://localhost:8080/api/categorys/' + _id,
      category
    );
  }
  deleteCategorys(id: number | string): Observable<ICategory> {
    return this.http.delete<ICategory>(
      'http://localhost:8080/api/categorys/' + id
    );
  }
  addCategorys(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(
      'http://localhost:8080/api/categorys/',
      category
    );
  }
  editPatchCategorys(category: ICategory): Observable<ICategory> {
    return this.http.patch<ICategory>(
      'http://localhost:8080/api/categorys/' + category._id,
      category
    );
  }
  editCategorys(
    id: number | string,
    category: ICategory
  ): Observable<ICategory> {
    return this.http.put<ICategory>(
      'http://localhost:8080/api/categorys/' + id,
      category
    );
  }
  getOneCategory(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(
      `http://localhost:8080/api/categorys/${id}`
    );
  }
}
