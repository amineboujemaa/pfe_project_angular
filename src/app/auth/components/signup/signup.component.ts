import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit{

  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private message: NzMessageService, 
    private router:Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkpassword: [null, [Validators.required, this.confirmationValidate]],
    })
  }
  confirmationValidate = (control: FormControl): { [key: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {}; 
};




register(){
  console.log(this.signupForm.value);
  this.authService.register(this.signupForm.value).subscribe((res)=>{
    console.log(res);
    if(res.id != null){
      this.message.success('Inscription réussie', { nzDuration: 5000 }); 
      this.router.navigateByUrl("")
    }else{
      this.message.error('Un problème est survenu, verifier vos donner', { nzDuration: 5000 }); 

    }
  })
}
}

