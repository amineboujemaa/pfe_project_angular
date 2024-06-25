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

}
