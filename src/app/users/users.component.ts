import {ChangeDetectorRef, Component, OnInit, AfterContentChecked, ViewChild} from '@angular/core';
import {User} from "./user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UsersService} from "../shared/users.service";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterContentChecked {
  users: User[] = []
  subscriptions: Subscription[] = []

  dataSource: MatTableDataSource<User>;
  displayedColumns = ['id', 'name', 'occupation', 'email', 'bio', 'actions']

  constructor(private changeDetector: ChangeDetectorRef, private userService: UsersService, private httpClient: HttpClient) {}

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizes = [5, 10, 25, 50, 100]

  ngOnInit(): void {
    this.userService.getUsers();
    let subscription = this.userService.users.subscribe(users => {
      this.users = users;
    });
    this.subscriptions.push(subscription)
  }

  ngOnDestroy(){}

  ngAfterViewInit(){
    this.dataSource = new MatTableDataSource(this.users)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  ngAfterContentChecked(){
    this.changeDetector.detectChanges()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
