import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  cars: any = [];
  data:any;
  qrCodeImage: any;

  constructor(private adminService: AdminService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getAllCars();
    this.adminService.getStat().subscribe(res => {
      console.log(res);
      this.data = res;
    })
  }




  getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res);
      this.cars = [];
      res.forEach((car: any) => {
        car.processedImg = 'data:image/jpeg;base64,' + car.returnedImage;
        this.cars.push(car);
      });
    })
  }

  deleteCar(id: number) {
    console.log(id);
    this.adminService.deleteCar(id).subscribe((res) => {
      this.getAllCars();
      this.message.success("voiture suprimer", { nzDuration: 5000 });
    })
  }

  confirmDelete(carId: number): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')) {
      this.deleteCar(carId);
    }
  }

  generateQRCode(carId : number){
    this.adminService.generateQRCode(carId).subscribe((data: Blob) => {
      console.log(data)
      this.createImageFromBlob(data);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.qrCodeImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  closePopup() {
    this.qrCodeImage = null; // Set qrCodeImage to null to hide the popup
  }
}

