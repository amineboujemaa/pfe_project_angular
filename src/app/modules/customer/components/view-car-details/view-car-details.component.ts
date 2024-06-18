import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
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
  comments: any;

  constructor(    private service : CustomerService,
    private activatedRoute : ActivatedRoute,
    private fb : FormBuilder,
    private message : NzMessageService
) { }

  ngOnInit(): void {
    this.getCarById();
    this.getComments();
    this.commentForm=this.fb.group({content:[null,Validators.required]})
  }

  getCarById(){
    this.service.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImg = 'data:image/jpeg;base64,'+res.returnedImage;
      this.car = res;
    })
  }
  getComments(){
    this.service.getCommentByCarId(this.carId).subscribe((res)=>{
      console.log(res);
      this.comments = res;
    })

  }

  publier(){
    this.service.createComment(this.carId, this.commentForm.get("content")?.value).subscribe((res)=>{
      if(res.id!=null){
        this.message.success("Votre commantaire est bien publier", { nzDuration: 5000 });
        this.getComments();
        this.commentForm.reset();
      }else{
        this.message.error("Un probleme", { nzDuration: 5000 });
      }
    })
  }

}
