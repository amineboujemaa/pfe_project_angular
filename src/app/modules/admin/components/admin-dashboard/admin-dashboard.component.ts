import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  cars:any = [];

  constructor(private adminService:AdminService,
              private message : NzMessageService) { }

  ngOnInit() {
this.getAllCars();
  }




  getAllCars(){
    this.adminService.getAllCars().subscribe((res)=>{
      console.log(res);
      this.cars = [];
      res.forEach((car : any)  => {
        car.processedImg = 'data:image/jpeg;base64,' + car.returnedImage;
        this.cars.push(car);
      });
    })
  }

  deleteCar(id : number){
    console.log(id);
    this.adminService.deleteCar(id).subscribe((res)=>{
      this.getAllCars();
      this.message.success("voiture suprimer", {nzDuration : 5000});
    })
  }
  
  confirmDelete(carId: number): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
        this.deleteCar(carId);
    }
  }
}

