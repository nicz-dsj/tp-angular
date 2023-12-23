import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddUserComponent} from "./users/add-user/add-user.component";
import {UpdateUserComponent} from "./users/update-user/update-user.component";
import {UserDetailComponent} from "./users/user-detail/user-detail.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'users'},
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UserDetailComponent},
  {path: 'update/:id', component: UpdateUserComponent},
  {path: 'add', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
