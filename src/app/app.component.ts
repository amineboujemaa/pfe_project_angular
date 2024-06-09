import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { env } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pfe_project_angular';
  isCollapsed = false;

  isCustomerLoggedIn : boolean = StorageService.isCutomerLoggedIn();
  isAdminLoggedIn : boolean=StorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      if (event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCutomerLoggedIn();
      }
    })
  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/home");
  }
}
