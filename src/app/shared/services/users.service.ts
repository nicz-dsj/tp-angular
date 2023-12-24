import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {HttpService} from "./http.service";
import {Post} from "../models/post.model";

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
    )
      .subscribe((data: User[]) => {
        console.log(data)
        this.users.next(data)
      })
  }

  getUser(id: number) {
    this.httpService
      .getUser(id)
      .pipe(
        catchError((error) => {
          this.selectedUser.next(null);
          return throwError(error);
        })
      )
      .subscribe((data) => {
        this.selectedUser.next(data);
      });
  }

  addUser(user: Post): void {
    const sub = this.httpService.addUser(user).subscribe((data) => {
      console.log(data);
      console.log('Utilisateur crée.');

      this.httpService.getUsers().subscribe((users) => {
        this.users.next(users);
      });

      this.router.navigate(['']);
      sub.unsubscribe;
    });
  }

  updateUser() {
    const selectedUser = this.selectedUser.getValue();
    if (selectedUser) {
      const sub = this.httpService
        .updateUser(selectedUser.id, selectedUser)
        .subscribe(() => {
          console.log('Utilisateur mis à jour.');

          this.httpService.getUsers().subscribe((users) => {
            this.users.next(users);
          });

          this.router.navigate(['']);
          this.selectedUser.next(null);
          sub.unsubscribe();
        });
    }
  }

  deleteUser(id: number){
    const sub = this.httpService
      .deleteUser(id)
      .subscribe(() => {
        console.log('Utilisateur supprimé');

        this.httpService.getUsers().subscribe((users) => {
          this.users.next(users);
        });

        this.router.navigate(['']);
        sub.unsubscribe();
      });
  }
}
