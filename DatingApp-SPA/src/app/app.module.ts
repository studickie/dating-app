import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import NavComponent from "./navComponent/nav.component";
import HomeComponent from "./homeComponent/home.component";
import RegisterComponent from "./registerComponent/register.component";

import { AuthService } from "./_services/auth.service";
import { AlertifyService } from "./_services/alertifyJs";
import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
