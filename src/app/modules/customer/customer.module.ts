import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookVisitComponent } from './components/book-visit/book-visit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { SavedCarComponent } from './components/saved-car/saved-car.component';
import { ViewCarDetailsComponent } from './components/view-car-details/view-car-details.component';



@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BookVisitComponent,
    MyBookingsComponent,
    SearchCarComponent,
    UserUpdateComponent,
    SavedCarComponent,
    ViewCarDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzTableModule
  ]
})
export class CustomerModule { }
