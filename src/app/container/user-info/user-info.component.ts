import { Component, OnInit } from "@angular/core";
import { DialogsService } from "../../shared/dialogs/dialogs.service";
import { filter } from "rxjs/operators";
import { NotificationsService } from "../../shared/notifications/notifications.service";
import { DatabaseService } from "src/app/shared/db.service";
import { UsersState } from './users.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { GetUsers } from './users.action';

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.component.html",
  styleUrls: ["./user-info.component.css"]
})
export class UserInfoComponent implements OnInit {
  @Select(UsersState.getUsersList) users$: Observable<User[]>;
  isLogin: boolean;
  filterStr = "";

  constructor(
    private dialogs: DialogsService,
    private notification: NotificationsService,
    private db: DatabaseService,
    private store: Store
  ) {
  }

  ngOnInit(){
    this.store.dispatch(new GetUsers());
  }

  colums = [
    { key: "username", header: "Username" },
    { key: "name", header: "Firstname" },
    { key: "surname", header: "Lastname" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" }
  ];

  applyFilter(value: any) {
    this.filterStr = value;
  }

  createUser() {
    this.dialogs
      .openCreateUserDialog({ title: "Add new user" })
      .pipe(filter(Boolean))
      .subscribe(res => {
        this.db.addUser(res);
        this.notification.successNotification("User added");
      });
  }

  editUser(user) {
    this.dialogs
      .openEditUserDialog({ user })
      .pipe(filter(Boolean))
      .subscribe(res => {
        this.db.updateUser(res);
        this.notification.successNotification("User updated");
      });
  }
}
