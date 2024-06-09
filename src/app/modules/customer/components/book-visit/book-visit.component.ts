import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-book-visit',
  templateUrl: './book-visit.component.html',
  styleUrls: ['./book-visit.component.scss']
})
export class BookVisitComponent  {

  carId : number = this.activatedRoute.snapshot.params["id"]
  car : any;
  processedImg:any;
  validateForm! : FormGroup;
  isSpinning = false;

  constructor( private service:CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder,
    private message:NzMessageService,
    private router:Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      visitDate:[null, Validators.required],
      visitTime:[null, Validators.required]
    })

    this.getCarById();
  }

  getCarById(){
    this.service.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImg = 'data:image/jpeg;base64,'+res.returnedImage;
      this.car = res;
    })

  }

  bookAVisit(data : any){
    console.log(data);
    this.isSpinning = true;
    let bookAVisitDto = {
      visitTime:data.visitTime,
      visitDate:data.visitDate,
      userId:StorageService.getUserId(),
      carId:this.carId
    }
    this.service.bookAVisit(bookAVisitDto).subscribe((res) =>{
      console.log(res);
      this.message.success("Booking request submitted",{nzDuration: 5000});
      this.router.navigateByUrl("/customer/dashboard");
    },error =>{
      this.message.error("something went wrong", {nzDuration: 5000});
    })


  }
}
