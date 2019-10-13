import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../_services/auth.service";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls:[]
})

export default class NavComponent implements OnInit {
    model: any = {};
    
    constructor(private authService: AuthService){}

    ngOnInit () {}

    login () {
        this.authService.login(this.model).subscribe(next => {
            console.log("Login Success")
        }, error => {
            console.log(error)
        })
    }

    loggedIn() {
        const token = localStorage.getItem("token");
        return !!token;
    }

    logout() {
        localStorage.removeItem("token");
        console.log("Looged out");
    }
}