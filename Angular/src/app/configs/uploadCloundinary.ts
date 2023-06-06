import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class CloudinaryUpload {
  constructor(private _http: HttpClient) {}
  uploadImage(vals: any): Observable<any> {
    let data = vals;
    return this._http.post(
      'https://api.cloudinary.com/v1_1/dpsl2xj1j/image/upload',
      data
    );
  }
}
