import { Component, OnInit } from "@angular/core";
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertifyJs';
import { IUser } from '../_models/IUser';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: "app-members",
    templateUrl: "./members.component.html"
})

export default class MembersComponent implements OnInit {
    users: IUser[];

    constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) {}
    
    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.users = data["users"];
        })
    }

    loadUsers() {
        this.userService.getUsers().subscribe((users: IUser[]) => {
            this.users = users;
        }, error => {
            this.alertify.error(error)
        })
    }
}