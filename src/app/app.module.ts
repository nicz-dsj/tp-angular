import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { UsersComponent } from './users/users.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UsersService} from "./shared/users.service";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UpdateUserComponent,
    AddUserComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    provideClientHydration(), provideHttpClient(withFetch()), UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
