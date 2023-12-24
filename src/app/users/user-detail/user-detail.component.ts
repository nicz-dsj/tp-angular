import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../shared/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../shared/models/user.model";
import {Subscription} from "rxjs";
import {DeleteUserDialogComponent} from "../delete-user-dialog/delete-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  selectedUser: User | null = null
  subscriptions: Subscription[] = []

  constructor(private userService: UsersService, private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10)
    this.userService.getUser(id)

    let subscription = this.userService.selectedUser.subscribe(
      (user) => {
        if(user){
          this.selectedUser = user
        }
      }
    )

    this.subscriptions.push(subscription)
  }

  openDialog(){
    this.dialog.open(DeleteUserDialogComponent, {
      width: '500px',
      data: this.selectedUser
    })
  }
}
