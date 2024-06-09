import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent{

  bookings: any
  isSpinning= false;

  constructor(private service: CustomerService) {
}

  ngOnInit(){
    this.getMyBookings();

  }
  

  getMyBookings() {
    this.isSpinning=true;
    this.service.getBookingsByUserId().subscribe((res) => {
      console.log(res);
      this.isSpinning=false;
      this.bookings = res;
    })
  }
}


