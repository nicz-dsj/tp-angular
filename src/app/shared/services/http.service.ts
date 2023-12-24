import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {Post} from "../models/post.model";

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

  public updateUser(id: number, user: User): Observable<any> {
    return this.httpClient.put(`${this.BASE_URL}/users/${id}`, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.BASE_URL}/users/${id}`, {
      responseType: 'text',
    });
  }
}
