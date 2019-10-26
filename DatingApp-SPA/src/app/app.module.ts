// dependencies
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from "ngx-gallery";
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import NavComponent from "./navComponent/nav.component";
import HomeComponent from "./homeComponent/home.component";
import RegisterComponent from "./registerComponent/register.component";
import MembersComponent from "./membersComponent/members.component";
import MemberCardComponent from "./membersComponent/memberCardComponent/memberCard.component";
import MessagesComponent from './messagesComponent/messages.component';
import MemberDetailComponent from "./membersComponent/memberDetailComponent/memberDetail.component";
import PhotoUploadComponent from "./membersComponent/PhotoUploadComponent/photoUpload.component";
import ListsComponent from './listsComponent/lists.component';
import MemberEditComponent from "./membersComponent/memberEdit.Component.ts/memberEdit.component";

// services
import { AuthService } from "./_services/auth.service";
import { AlertifyService } from "./_services/alertifyJs";
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberDetailResolver } from './_resolvers/memberDetail.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from "./_guards/preventUnsavedChanges.guard";
import { UserService } from './_services/user.service';
import { MemberListResolver } from './_resolvers/memberList.resolver';
import { MemberEditResolver } from "./_resolvers/memberEdit.resolver";

export function tokenGetter () {
  return localStorage.getItem("token");
}

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pinkch: {enable: false},
    rotate: {enable: false}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MembersComponent,
    MemberCardComponent,
    MessagesComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoUploadComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    PreventUnsavedChanges,
    AlertifyService,
    ErrorInterceptorProvider,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    UserService,
    {provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
