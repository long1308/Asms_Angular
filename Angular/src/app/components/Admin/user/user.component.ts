import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { signin, signup } from 'src/app/interface/user';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class UserComponent {
  users!: signup[];
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.productService.getUsers().subscribe((data: any) => {
      this.users = data.user.filter((user: any) => user.role === 'member');
      console.log(this.users);
    });
  }
  deleteUser(user: signup) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteUser(user._id!).subscribe((data: any) => {
          this.productService.getUsers().subscribe((data: any) => {
            this.users = data.user.filter(
              (user: any) => user.role === 'member'
            );
          });
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'User Deleted',
          life: 3000,
        });
      },
    });
  }
}
