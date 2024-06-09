import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-saved-car',
  templateUrl: './saved-car.component.html',
  styleUrls: ['./saved-car.component.scss']
})
export class SavedCarComponent implements OnInit {
  cars: any;
  isSpinning = false;
  processedImg: any;
  constructor(private service: CustomerService,
    private message: NzMessageService) {

  }

  ngOnInit(): void {
    this.getMyCars();
  }


  getMyCars() {
    this.isSpinning = true;
    this.service.getCarsByUserId().subscribe((res) => {
      console.log(res);
      this.cars = [];
      res.forEach((car: any) => {
        car.processedImg = 'data:image/jpeg;base64,' + car.returnedImage;
        this.cars.push(car);
      });
    })
  }

  confirmDelete(carId: number): void {
    if (window.confirm('Êtes-vous sûr de retirer cette voiture du favoris?')) {
      this.deleteCar(carId);
    }
  }

  deleteCar(id: number) {
    console.log(id);
    this.service.deleteCar(id).subscribe((res) => {
      this.getMyCars();
      this.message.success("voiture suprimer", { nzDuration: 5000 });
    })
  }


}
