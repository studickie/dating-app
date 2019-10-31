import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from 'src/app/_services/auth.service';
import { IMessage } from 'src/app/_models/IMessage';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertifyJs';

@Component({
    selector: "app-member-messages",
    templateUrl: "./memberMessages.component.html",
    styleUrls: ["./memberMessages.component.css"]
})

export default class MemberMessagesComponent implements OnInit {
    @Input() recipientId: number;
    messages: IMessage[];

    constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService) {};

    ngOnInit() {
        this.loadMessages();
    }

    loadMessages() {
        this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId).subscribe( messages => {
            this.messages = messages;
        }, error => {
            this.alertify.error(error);
        });
    }
}