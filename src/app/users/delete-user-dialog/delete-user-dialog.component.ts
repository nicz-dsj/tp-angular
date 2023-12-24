import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../shared/models/user.model";
import {UsersService} from "../../shared/services/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";

class DialogOverviewExampleDialog {
}

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private usersService: UsersService,
    private _snackbar: MatSnackBar
  ) {}

  onDelete(){
    this._snackbar.open('Utilisateur supprimé.', 'Fermer')
    this.usersService.deleteUser(this.data.id);
    this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }
}
