import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertifyJs";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { IMessage } from '../_models/IMessage';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberMessagesResolver implements Resolve<IMessage[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = "Unread";

    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot) : Observable<IMessage[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error("Problem retrieving messages")
                this.router.navigate(["'/home"]);
                return of(null)
            })
        )
    }
}