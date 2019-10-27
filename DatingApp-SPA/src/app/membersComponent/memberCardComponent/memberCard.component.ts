import {OnInit, Component, Input} from "@angular/core";
import { IUser } from 'src/app/_models/IUser';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertifyJs';

@Component({
    selector: "app-member-card",
    templateUrl: "./memberCard.component.html",
    styleUrls: ["./memberCard.component.css"]
})
export default class MemberCardComponent implements OnInit {
    @Input() user: IUser;
    
    constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService){}
    
    ngOnInit(){}

    sendLike(id: number) {
        this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
            this.alertify.success(`You have liked ${this.user.knownAs}`);
        }, error => {
            this.alertify.error(error);
        })
    }
}