import {ChangeDetectorRef, Component, OnInit, AfterContentChecked, ViewChild} from '@angular/core';
import {User} from "../shared/models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UsersService} from "../shared/services/users.service";
import {Subscription} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {DeleteUserDialogComponent} from "./delete-user-dialog/delete-user-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = []
  subscriptions: Subscription[] = []
  selectedUser: User | null = null;

  dataSource: MatTableDataSource<User>;
  displayedColumns = ['id', 'name', 'occupation', 'email', 'bio', 'actions']

  constructor(private changeDetector: ChangeDetectorRef, private userService: UsersService, public dialog: MatDialog) {}

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pageSizes = [5, 10, 25, 50, 100]

  ngOnInit(): void {

  }

  ngOnDestroy(){
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngAfterViewInit(){
    this.userService.getUsers();
    let subscription = this.userService.users.subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    });

    this.subscriptions.push(subscription)
    this.changeDetector.detectChanges()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(element: User){
    this.dialog.open(DeleteUserDialogComponent, {
      width: '500px',
      data: element
    })
  }
}
