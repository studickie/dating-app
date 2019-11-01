import { Component, OnInit } from "@angular/core";
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertifyJs';
import { IMessage } from '../_models/IMessage';
import { IPagination, PaginatedResult } from '../_models/IPagination';

@Component({
    selector: "app-messages",
    templateUrl: "./messages.component.html",
    styleUrls: ["./messages.component.css"]
})

export default class MessagesComponent implements OnInit {
    messages: IMessage[];
    pagination: IPagination;
    messageContainer = "Unread";
    
    constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private alertify: AlertifyService) {}
    
    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.messages = data["messages"].result;
            this.pagination = data["messages"].pagination;
        })
    }

    loadMessages() {
        this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
            .subscribe((res: PaginatedResult<IMessage[]>) => {
                this.messages = res.results;
                this.pagination = res.pagination;
            }, error => {
                this.alertify.error(error);
            })
    }

    deleteMessage(id: number) {
        this.alertify.confirm("Are you sure you want to delete this message?", () => {
            this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
                this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
                this.alertify.success("Message has been deleted");
            }, error => {
                this.alertify.error("Failed to delete message");
            })
        })
    }

    pageChanged(event: any) {
        this.pagination.currentPage = event.page;
        this.loadMessages();
    }

}