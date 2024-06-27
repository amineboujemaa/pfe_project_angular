import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  validateForm! : FormGroup;

  constructor( 
    private service:AuthService,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder,
    private message:NzMessageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      firstName:[null, Validators.required],
      lastName:[null, Validators.required],
      email:[null, Validators.required],
      phone:[null, Validators.required],
      message:[null, Validators.required],

    })
  }

  sendMessage(data:any){
    let contactUsDto = {
      firstName:data.firstName,
      lastName:data.lastName,
      email:data.email,
      phone:data.phone,
      message:data.message
    }

    this.service.sendMessage(contactUsDto).subscribe((res) =>{
      console.log(res);
      this.message.success("message envoyer",{nzDuration: 5000});
      this.router.navigateByUrl("/home/");
    },error =>{
      this.message.error("something went wrong", {nzDuration: 5000});
    })
  }

}
