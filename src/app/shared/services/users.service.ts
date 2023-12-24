import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../users/user.model";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {Post} from "../users/add-user/post.model";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  users = new BehaviorSubject<User[]>([]);
  selectedUser = new BehaviorSubject<User | null>(null)

  constructor(private router: Router, private httpService: HttpService) { }

  getUsers() {
    this.httpService.
    getUsers().pipe(
      map((data: User[]) => {
        return data.map((element) => {
          element.bio = element.bio.length > 30 ? element.bio.slice(0, 30) + '...' : element.bio
          return element
        })
      }),
      catchError((error) => {
        throw new Error(error)
      })
    )
      .subscribe((data: User[]) => {
        console.log(data)
        this.users.next(data)
      })
  }

  getUser(id: number){
    const sub = this.httpService
      .getUser(id)
      .subscribe((data) => {
        this.selectedUser.next(data);
        sub.unsubscribe();
      });
  }

  addUser(user: Post): void {
    const sub = this.httpService.addUser(user).subscribe((data) => {
      console.log(data);
      console.log('add user');
      this.router.navigate(['home']);
      sub.unsubscribe;
    });
  }
}
