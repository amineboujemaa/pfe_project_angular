import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//imports ng zorro
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IndexComponent } from './auth/components/index/index.component';
import { ContactUsComponent } from './auth/components/contact-us/contact-us.component';


registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    IndexComponent,
    ContactUsComponent,
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzMessageModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    BrowserAnimationsModule,

  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
