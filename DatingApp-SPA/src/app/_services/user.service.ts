import {Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from "../_models/IUser";
import { PaginatedResult } from '../_models/IPagination';
import { map } from 'rxjs/operators';

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

    getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<IUser[]>> {
        const paginatedResult: PaginatedResult<IUser[]> = new PaginatedResult<IUser[]>();
        
        let params = new HttpParams();

        if (page != null && itemsPerPage != null) {
            params = params.append("pageNumber", page);
            params = params.append("pageSize", itemsPerPage);
        }

        if (userParams != null) {
            params = params.append("minAge", userParams.minAge);
            params = params.append("maxAge", userParams.maxAge);
            params = params.append("gender", userParams.gender);
            params = params.append("orderBy", userParams.orderBy);
        }

        return this.http.get<IUser[]>(`${this.baseUrl}users`, {observe: "response", params})
            .pipe(
                map(response => {
                    paginatedResult.results = response.body;

                    if (response.headers.get("pagination") !== null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get("PAgination"));
                    }
                    return paginatedResult;
                })
            )
    }

    getUser(id): Observable<IUser> {
        return this.http.get<IUser>(`${this.baseUrl}users/${id}`);
    }

    updateUser(id: number, user: IUser) {
        return this.http.put(`${this.baseUrl}users/${id}`, user);
    }

    setMainPhoto(userId: number, id: number) {
        return this.http.post(`${this.baseUrl}users/${userId}/photos/${id}/setMain`, {});
    }

    deletePhoto(userId: number, id: number) {
        return this.http.delete(`${this.baseUrl}users/${userId}/photos/${id}`);
    }
}