import { Component, OnInit, Input } from "@angular/core";
import { AuthService } from 'src/app/_services/auth.service';
import { IMessage } from 'src/app/_models/IMessage';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertifyJs';
import { tap } from 'rxjs/operators';

@Component({
    selector: "app-member-messages",
    templateUrl: "./memberMessages.component.html",
    styleUrls: ["./memberMessages.component.css"]
})

export default class MemberMessagesComponent implements OnInit {
    @Input() recipientId: number;
    messages: IMessage[];
    newMessage: any = {};

    constructor(private userService: UserService, private authService: AuthService, private alertify: AlertifyService) {};

    ngOnInit() {
        this.loadMessages();
    }

    loadMessages() {
        const currentUserId = +this.authService.decodedToken.nameid;
        this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
            .pipe(
                tap(messages => {
                    messages.forEach((msg) => {
                        if (!msg.isRead && msg.recipientId === currentUserId) {
                            this.userService.markAsRead(currentUserId, msg.id);
                        }
                    })
                })
            )
            .subscribe( messages => {
                this.messages = messages;
            }, error => {
                this.alertify.error(error);
            });
    }

    sendMessage() {
        this.newMessage.recipientId = this.recipientId;
        this.userService.sendMessag(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: IMessage) => {
            this.messages.unshift(message);
            this.newMessage.content = "";
        }, error => {
            this.alertify.error(error)
        })
    }
}