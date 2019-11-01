import {Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { IUser } from "../_models/IUser";
import { PaginatedResult } from '../_models/IPagination';
import { IMessage } from "../_models/IMessage";
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

    getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<IUser[]>> {
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

        if (likesParam === "Likers") {
            params = params.append("likers", "true");
        }

        if (likesParam === "Likees") {
            params = params.append("likees", "true");
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

    sendLike(id: number, recipientId: number) {
        return this.http.post(`${this.baseUrl}users/${id}/like/${recipientId}`, {});
    }

    getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
        const paginatedResult: PaginatedResult<IMessage[]> = new PaginatedResult<IMessage[]>();

        let params = new HttpParams();

        params = params.append("MessageContainer", messageContainer);

        if (page != null && itemsPerPage != null) {
            params = params.append("pageNumber", page);
            params = params.append("pageSize", itemsPerPage);
        }

        return this.http.get<IMessage[]>(`${this.baseUrl}users/${id}/messages`, {observe: "response", params})
            .pipe(
                map(response => {
                    paginatedResult.results = response.body;
                    if(response.headers.get("Pagination") != null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get("pagination"));
                    }

                    return paginatedResult;
                })
            );
    }

    getMessageThread(id: number, recipientId: number) {
        return this.http.get<IMessage[]>(`${this.baseUrl}users/${id}/messages/thread/${recipientId}`);
    }

    sendMessag(id: number, message: IMessage) {
        return this.http.post(`${this.baseUrl}users/${id}/messages`, message);
    }

    deleteMessage(id: number, userId: number) {
        return this.http.post(`${this.baseUrl}users/${userId}/messages/${id}`, {});
    }

    markAsRead(userId: number, messageId: number) {
        this.http.post(`${this.baseUrl}users/${userId}/messages/${messageId}/read`, {}).subscribe();
    }
}