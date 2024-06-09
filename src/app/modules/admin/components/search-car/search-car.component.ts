import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent implements OnInit {
  cars:any = [];

  searchCarForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "TOYOTA"];
  listOfType = ["Petrol", "Diesel", "Hybrid", "electric"];
  listOfColor = ["Red", "Blue", "White"];
  listOfTransmission = ["manual", "automatic"];

  isSpinning=false;
  constructor(private fb: FormBuilder,
    private message: NzMessageService,
    private service: AdminService) {
    this.searchCarForm = this.fb.group({
      brand:[null],
      type:[null],
      transmission:[null],
      color:[null],
    })
  }

  ngOnInit(): void {
  }
  
  searchCar(){
    console.log(this.searchCarForm.value)
    this.isSpinning=true;
    this.service.searchCar(this.searchCarForm.value).subscribe((res)=>{
      console.log(res);
      res.carDtoList.forEach((car : any)  => {
        car.processedImg = 'data:image/jpeg;base64,' + car.returnedImage;
        this.cars.push(car);
      });
      this.isSpinning=false;
    })

  }
  deleteCar(id : number){
    console.log(id);
    this.service.deleteCar(id).subscribe((res)=>{
      this.getAllCars();
      this.message.success("voiture suprimer", {nzDuration : 5000});
    })
  }
  getAllCars(){
    this.service.getAllCars().subscribe((res)=>{
      console.log(res);
      this.cars = [];
      res.forEach((car : any)  => {
        car.processedImg = 'data:image/jpeg;base64,' + car.returnedImage;
        this.cars.push(car);
      });
    })
  }
}
