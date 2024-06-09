import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { IndexComponent } from './auth/components/index/index.component';
import { ContactUsComponent } from './auth/components/contact-us/contact-us.component';

const routes: Routes = [
  {path:"home", component: IndexComponent},
  {path:"register", component: SignupComponent},
  {path : "login", component: LoginComponent},
  {path : "contact", component: ContactUsComponent},
  {path : "admin", loadChildren:() => import ("./modules/admin/admin.module").then(m => m.AdminModule) },
  {path : "customer", loadChildren:()=> import ("./modules/customer/customer.module").then(m =>m.CustomerModule)},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
