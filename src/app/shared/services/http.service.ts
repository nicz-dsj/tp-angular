import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../users/user.model";
import {Post} from "../users/add-user/post.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private BASE_URL = "https://6583706e4d1ee97c6bcdf529.mockapi.io/tpangular"

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.BASE_URL}/users`)
  }

  public getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  public addUser(user: Post): Observable<User> {
    return this.httpClient.post<User>(`${this.BASE_URL}/users/`, user);
  }
}
