import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../interface/product';
import { signup , signin } from '../interface/user';

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
  register(user: signup) :Observable<signup>{
    return this.http.post<signup>('http://localhost:8080/api/signup',user);
  }

  login(user: signin) :Observable<signin> {
    return this.http.post<signin>('http://localhost:8080/api/signin',user);
  }


}
