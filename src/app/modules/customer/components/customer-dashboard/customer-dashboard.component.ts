import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {

  cars: any = [];
  pinned: any;
  data: any;

  constructor(private service: CustomerService,
    private message: NzMessageService,

  ) { }

  ngOnInit() {
    this.getAllCars();
    this.service.getStat().subscribe(res => {
      console.log(res);
      this.data = res;
    })
  }

  getAllCars() {

    this.service.getAllCars().subscribe((res) => {
      console.log(res);
      this.cars = [];
      res.forEach((car: any) => {
        car.processedImg = 'data:image/jpeg;base64,' + car.returnedImage;
        this.cars.push(car);
      });

    })
  }

  saveThisCar(carID: number) {
    let savedCarDto = {
      carId: carID,
      userId: StorageService.getUserId(),
    }
    this.service.saveACar(savedCarDto).subscribe((res) => {
      console.log(res);
      this.message.success("voiture enregistrer", { nzDuration: 5000 });
    }, error => {
      this.message.error("problem", { nzDuration: 5000 });
    })
  }

}
