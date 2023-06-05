import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceComponent } from '../auth-service/auth-service.component';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-auth-guard-not-logged',
  templateUrl: './auth-guard-not-logged.component.html',
  styleUrls: ['./auth-guard-not-logged.component.css'],
})
export class AuthGuardNotLoggedComponent implements CanActivate {
  constructor(private router: Router, private authService: AuthServiceComponent) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']); // Chuyển hướng nếu người dùng đã đăng nhập
      return false;
    }
    return true; // Cho phép truy cập nếu người dùng chưa đăng nhập
  }
}
