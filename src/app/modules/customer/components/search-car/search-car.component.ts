import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent  {

  cars:any = [];

  searchCarForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW", "AUDI", "TOYOTA"];
  listOfType = ["Petrol", "Diesel", "Hybrid", "electric"];
  listOfColor = ["Red", "Blue", "White"];
  listOfTransmission = ["manual", "automatic"];

  isSpinning=false;
  constructor(private fb: FormBuilder,
    private service: CustomerService) {
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

}
