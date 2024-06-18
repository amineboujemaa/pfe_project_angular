import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookVisitComponent } from './components/book-visit/book-visit.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { SearchCarComponent } from './components/search-car/search-car.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { SavedCarComponent } from './components/saved-car/saved-car.component';
import { ViewCarDetailsComponent } from './components/view-car-details/view-car-details.component';
const routes: Routes = [
  {path:"dashboard",component : CustomerDashboardComponent},
  {path:"book/:id",component : BookVisitComponent},
  {path:"my_bookings",component : MyBookingsComponent},
  {path:"search",component : SearchCarComponent},
  {path:"user-update",component : UserUpdateComponent},
  {path:"savedcar",component : SavedCarComponent},
  {path: "car-details/:id" , component: ViewCarDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
