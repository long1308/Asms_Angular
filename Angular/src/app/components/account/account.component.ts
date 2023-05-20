import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  user: any[] = []; // Mảng để lưu trữ dữ liệu nhận được

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Gửi yêu cầu GET đến endpoint Node.js
    this.http.get<any[]>('http://localhost:3000/api/user').subscribe(
      (data) => {
        this.user = data; // Lưu trữ dữ liệu nhận được từ endpoint
      },
      (error) => {
        console.error(error); // Xử lý lỗi nếu có
      }
    );
  }
}
