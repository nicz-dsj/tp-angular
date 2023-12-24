import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {Post} from "../../shared/models/post.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private _snackbar: MatSnackBar) { }

  addUserForm = this.formBuilder.group({
    name: '',
    occupation: '',
    email: '',
    bio: ''
  })

  onSubmit(){
    const newUser = new Post(this.addUserForm.value.name, this.addUserForm.value.occupation, this.addUserForm.value.email, this.addUserForm.value.bio)
    this._snackbar.open('Utilisateur crée.', 'Fermer')
    this.usersService.addUser(newUser)
    this.addUserForm.reset()
  }
}
