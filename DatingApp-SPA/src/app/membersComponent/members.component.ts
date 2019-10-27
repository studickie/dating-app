import { Component, OnInit } from "@angular/core";
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertifyJs';
import { IUser } from '../_models/IUser';
import { ActivatedRoute } from '@angular/router';
import { IPagination, PaginatedResult } from '../_models/IPagination';

@Component({
    selector: "app-members",
    templateUrl: "./members.component.html"
})

export default class MembersComponent implements OnInit {
    users: IUser[];
    user: IUser = JSON.parse(localStorage.getItem("user"));
    genderList = [{value: "male", display: "Males"}, {value: "female", display: "Females"}];
    userParams: any = {};
    pagination: IPagination;

    constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) {}
    
    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.users = data["users"].results;
            this.pagination = data["users"].pagination;
        })

        this.userParams.gender === "female" ? "male" : "female";
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.userParams.orderBy = "lastActive";
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        this.loadUsers()
    }

    resetFilters () {
        this.userParams.gender === "female" ? "male" : "female";
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.loadUsers();
    }

    loadUsers() {
        this.userService
            .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
            .subscribe((res: PaginatedResult<IUser[]>) => {
                    this.users = res.results;
                    this.pagination = res.pagination;
                }, error => {
                    this.alertify.error(error)
                })
    }
}