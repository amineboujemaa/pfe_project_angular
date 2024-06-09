import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss']
})
export class GetBookingsComponent {
  isSpinning = false;
  bookings: any;

  constructor(private adminService: AdminService,
    private message: NzMessageService
  ) {
    this.getBookings()
  }

  getBookings() {
    this.isSpinning = true;
    this.adminService.getCarBookings().subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      this.bookings = res;
    })
  }

  showAllBookings() {
    this.isSpinning = true;
    this.adminService.showAllBookings().subscribe((all) => {
      console.log(all);
      this.isSpinning = false;
      this.bookings = all;

    })
  }


  changeBookingStatus(bookingId: number, status: string) {
    this.isSpinning = true;
    console.log(bookingId, status);
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.getBookings();
      this.message.success("Changement de statut réussi", { nzDuration: 5000 });

    }, error => {
      this.message.error("Un problème est survenu", { nzDuration: 5000 })
    })
  }
  
  confirmChoix(bookingId: number , status: string): void {
    if (window.confirm('Êtes-vous sûr ?')) {
        this.changeBookingStatus(bookingId,status);
    }
  }

}
