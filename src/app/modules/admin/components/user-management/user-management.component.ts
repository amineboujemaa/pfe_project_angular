import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  isSpinning = false;
  users: any;

  constructor(private adminService: AdminService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.isSpinning = true;
    this.adminService.getAllUsers().subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      this.users = res;
    })
  }

  deleteUser(id: number) {
    console.log(id);
    this.adminService.deleteUser(id).subscribe((res) => {
      this.getUsers();
      this.message.success("utilisateur suprimer", { nzDuration: 5000 });
    })
  }

  confirmDelete(userId: number): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette utilisateur ?')) {
      this.deleteUser(userId);
    }
  }

  confirmChoix(userId: number): void {
    if (window.confirm('Êtes-vous sûr de change le user role ?')) {
      this.userRoleChange(userId);
    }
  }
  userRoleChange(id:number){
    console.log(id);
    this.adminService.userRoleChange(id).subscribe((res) => {
      this.getUsers();
      this.message.success("userRole bien changer !", { nzDuration: 5000 });
    })
  }

}
