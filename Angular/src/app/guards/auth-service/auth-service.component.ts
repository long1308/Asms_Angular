import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceComponent {
  private isAuthenticated = false;

  constructor() {
    // Kiểm tra trạng thái đăng nhập từ LocalStorage khi AuthService được khởi tạo
    const user = localStorage.getItem('user');
    if (user) {
      // Nếu tồn tại thông tin người dùng trong LocalStorage, đánh dấu là đã đăng nhập
      this.isAuthenticated = true;
    }
  }

  login() {
    // Thực hiện logic đăng nhập của bạn ở file login
    // Sau khi đăng nhập thành công, lưu thông tin người dùng vào LocalStorage
    const user = { username: 'example', email: 'example@example.com' };
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticated = true;
  }

  logout() {
    // Thực hiện logic đăng xuất của bạn
    // Xóa thông tin người dùng khỏi LocalStorage
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
