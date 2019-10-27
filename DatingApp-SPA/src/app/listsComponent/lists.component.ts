import { Component, OnInit } from "@angular/core";
import { IPagination, PaginatedResult } from '../_models/IPagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertifyJs';
import { IUser } from '../_models/IUser';

@Component({
    selector: "app-lists",
    templateUrl: "./lists.component.html"
})

export default class ListsComponent implements OnInit {
    users: IUser[];
    pagination: IPagination;
    likesParam: string;
    
    constructor(private authService: AuthService, private userService: UserService, private route: ActivatedRoute, private alertify: AlertifyService) {}
    
    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.users = data["users"].result;
            this.pagination = data["users"].pagination
        })
        this.likesParam = "Likers";
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        this.loadUsers()
    }

    loadUsers() {
        this.userService
            .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
            .subscribe((res: PaginatedResult<IUser[]>) => {
                    this.users = res.results;
                    this.pagination = res.pagination;
                }, error => {
                    this.alertify.error(error)
                })
    }
}