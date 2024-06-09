import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  cars:any = [];

  constructor(private authservice:AuthService,
    private message : NzMessageService) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  
  getAllCars(){
    this.authservice.getAllCars().subscribe((res)=>{
      console.log(res);
      this.cars = [];
      res.forEach((car : any)  => {
        car.processedImg = 'data:image/jpeg;base64,' + car.returnedImage;
        this.cars.push(car);
      });
    })
  }
}
