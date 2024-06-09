import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker'
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component'
import { NzTableModule } from 'ng-zorro-antd/table';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { ViewCarDetailsComponent } from './components/view-car-details/view-car-details.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostCarComponent,
    UpdateCarComponent,
    GetBookingsComponent,
    SearchCarComponent,
    ViewCarDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
  ]
})
export class AdminModule { }
