import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.scss']
})
export class AdminUpdateComponent implements OnInit {userUpdateForm!: FormGroup;
  confirmationValidate: any;
  isSpinning = false;
  
  
    constructor(    private fb: FormBuilder,
      private service : AdminService,
      private router:Router,
      private message : NzMessageService
  
    ) { }

  ngOnInit(): void {
    this.getUser();

    this.userUpdateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [{ value: null, disabled: true }, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      newpassword: [null, [Validators.required]],
    })
  }


  getUser(){
    this.isSpinning = true;
    this.service.getUserById().subscribe((res) => {
      this.isSpinning = false;
      const userDto = res;
      this.userUpdateForm.patchValue(userDto);
      console.log(userDto);
    })
  }

  UpdateUser(){
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append('name', this.userUpdateForm.value.name);
    formData.append('email', this.userUpdateForm.get('email')?.value);
    formData.append('password' , this.userUpdateForm.value.password);
    formData.append('newpassword', this.userUpdateForm.value.newpassword); 
    formData.forEach(data => { 
      console.log(data); 
    })
    this.service.updateUser(formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Bien modifier", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    },
      (error) => {
        this.isSpinning = false;
        this.message.error("Error updating user", { nzDuration: 5000 });
        console.log(error)
      })
  }

}
