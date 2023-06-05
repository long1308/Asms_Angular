import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-admin-guard',
  templateUrl: './admin-guard.component.html',
  styleUrls: ['./admin-guard.component.css'],
})
export class AdminGuardComponent implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Kiểm tra xem người dùng có vai trò "admin" hay không
    const user = JSON.parse(localStorage.getItem('user')!); // Lấy thông tin người dùng từ local storage hoặc nơi khác
    const isAdmin = user && user.role === 'admin';

    if (isAdmin) {
      return true; // Cho phép truy cập vào đường dẫn "admin/"
    } else {
      this.router.navigate(['/']); // Chuyển hướng đến trang không có quyền truy cập
      return false;
    }
  }
}
