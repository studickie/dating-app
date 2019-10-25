import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "./../../environments/environment";
import { IUser } from '../_models/IUser';

@Injectable({
    providedIn: "root"
})
export class AuthService {
    baseUrl = environment.apiUrl + "auth/";
    jwtHelper = new JwtHelperService();
    decodedToken: any;
    currentUser: IUser;
    photoUrl = new BehaviorSubject<string>("../../assets/user.png");
    currentPhotoUrl = this.photoUrl.asObservable();

    constructor(private http: HttpClient){}

    changeMemberPhoto(photoUrl: string) {
        this.photoUrl.next(photoUrl);
    }

    login(model: any) {
        return this.http.post(this.baseUrl + "login", model)
            .pipe(
                map((response: any) => {
                    if (response) {
                        localStorage.setItem("token", response.token);
                        localStorage.setItem('user', JSON.stringify(response.user));
                        this.decodedToken = this.jwtHelper.decodeToken(response.token);
                        this.currentUser = response.user;
                        this.changeMemberPhoto(this.currentUser.photoUrl);
                    }
                })
            )
    }

    register(model: any) {
        return this.http.post(this.baseUrl + "register", model);
    }

    loggedIn() {
        const token = localStorage.getItem("token");
        return !this.jwtHelper.isTokenExpired(token);
    }


}