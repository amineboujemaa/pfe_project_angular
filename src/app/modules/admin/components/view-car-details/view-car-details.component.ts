import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-car-details',
  templateUrl: './view-car-details.component.html',
  styleUrls: ['./view-car-details.component.scss']
})
export class ViewCarDetailsComponent implements OnInit {
  isSpinning = false;
  carId: number = this.activatedRoute.snapshot.params["id"];
  imagePreview:String | ArrayBuffer | null | undefined ;
  processedImg: string | null = null;
  car:any;
  commentForm!:FormGroup;

  constructor(private adminService:AdminService,
    private activatedRoute : ActivatedRoute,
    private fb : FormBuilder,
    private message : NzMessageService

  ) { }

  ngOnInit(): void {
  this.getCarById();
  this.commentForm=this.fb.group({
    content:[null,Validators.required]
  })
  }
  getCarById(){
    this.adminService.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImg = 'data:image/jpeg;base64,'+res.returnedImage;
      this.car = res;
    })

  }
  publier(){
    this.adminService.createComment(this.carId, this.commentForm.get("content")?.value).subscribe((res)=>{
      if(res.id!=null){
        this.message.success("Votre commantaire est bien publier", { nzDuration: 5000 });
      }else{
        this.message.error("Un probleme", { nzDuration: 5000 });
      }
    })
  }
}
