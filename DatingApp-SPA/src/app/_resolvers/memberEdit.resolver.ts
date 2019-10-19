import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import {IUser } from "../_models/IUser";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertifyJs";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<IUser> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot) : Observable<IUser> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error("Problem retrieving your data")
                this.router.navigate(["'/members"]);
                return of(null)
            })
        )
    }
}