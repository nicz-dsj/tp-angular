import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../users/user.model";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  users = new BehaviorSubject<User[]>([]);
  usersService: UsersService

  constructor(private router: Router, private httpService: HttpService) { }

  getUsers() {
    this.httpService.getUsers().subscribe((data: User[]) => this.users.next(data))
  }

  getUser(id: number) {
    this.httpService.getUser(id).subscribe((data: User[]) => this.users.next(data))
  }
}
