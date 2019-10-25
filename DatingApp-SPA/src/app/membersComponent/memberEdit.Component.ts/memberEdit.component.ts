import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/_models/IUser';
import { AlertifyService } from 'src/app/_services/alertifyJs';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
    selector: "app-member-edit",
    templateUrl: "./memberEdit.component.html",
    styleUrls: ["./memberEdit.component.css"]
})

export default class MemberEditComponent implements OnInit {
    @ViewChild('editForm', {static: true}) editForm: NgForm;
    @HostListener("window:beforeunload", ["$event"])
    unloadNotification($event: any) {
        if (this.editForm.dirty) {
            $event.returnValue = true;
        }
    }
    user: IUser;
    photoUrl: string;
    
    constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService, private authService: AuthService){}
    
    ngOnInit(){
        this.route.data.subscribe(data=> {
            this.user = data["user"];
        })
        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    updateUser() {
        this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
            this.alertify.success("Profile updated successfully");
            this.editForm.reset(this.user);
        }, error => {
            this.alertify.error(error);
        });
    }

    updateMainPhoto (photoUrl: string) {
        this.user.photoUrl = photoUrl;
    }
}