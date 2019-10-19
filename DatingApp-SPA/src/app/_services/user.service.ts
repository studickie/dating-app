import {Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from "../_models/IUser";

// const httpOptions = {
//     headers: new HttpHeaders({
//         "Authorization": "Bearer " + localStorage.getItem("token")
//     })
// }

@Injectable({
    providedIn: "root"
})
export class UserService {
    baseUrl = environment.apiUrl

    constructor(private http: HttpClient){}

    getUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.baseUrl + "users");
    }

    getUser(id): Observable<IUser> {
        return this.http.get<IUser>(this.baseUrl + "users/" + id);
    }

    updateUser(id: number, user: IUser) {
        return this.http.put(this.baseUrl + "users/" + id, user);
    }
}