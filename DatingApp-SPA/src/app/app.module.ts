import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import NavComponent from "./navComponent/nav.component";
import HomeComponent from "./homeComponent/home.component";
import RegisterComponent from "./registerComponent/register.component";
import MembersComponent from "./membersComponent/members.component";
import MessagesComponent from './messagesComponent/messages.component';
import ListsComponent from './listsComponent/lists.component';

import { AuthService } from "./_services/auth.service";
import { AlertifyService } from "./_services/alertifyJs";
import { ErrorInterceptorProvider } from './_services/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MembersComponent,
    MessagesComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AlertifyService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
