import { Component } from '@angular/core';
import {User} from "../../shared/models/user.model";
import {Subscription} from "rxjs";
import {UsersService} from "../../shared/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  selectedUser: User = new User()
  subscriptions: Subscription[] = []

  constructor(private userService: UsersService, private activatedRoute: ActivatedRoute, private router: Router, private _snackbar: MatSnackBar) {}

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10)
    this.userService.getUser(id)

    let subscription = this.userService.selectedUser.subscribe(
      (user) => {
        if(user){
          this.selectedUser = user
        }
        else{
          console.log('test')
        }
      }
    )

    this.subscriptions.push(subscription)
  }

  onSubmit(){
    if (this.selectedUser.name || this.selectedUser.occupation || this.selectedUser.email || this.selectedUser.bio) {
      this._snackbar.open('Utilisateur mis à jour.', 'Fermer')
      this.userService.updateUser();
    }
  }
}
