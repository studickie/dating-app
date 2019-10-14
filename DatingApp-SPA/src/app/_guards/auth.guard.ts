import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from "../_services/alertifyJs";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertify: AlertifyService){}

  canActivate() : boolean {
    if(this.authService.loggedIn()) {
      return true;
    }
    console.log('route', false);
    this.alertify.error("You must be logged in to continue");
    this.router.navigate(["/home"]);
    return false;
  }
}
