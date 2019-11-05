import { Component } from '@angular/core';
import { DialogsService } from '../../shared/dialogs/dialogs.service';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from '../../auth/authentication.service';
import data from '../../shared/users.json';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { DatabaseService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  isLogin: boolean;
  filterStr = '';
  users = data;

  constructor(
    private dialogs: DialogsService,
    private authenticationService: AuthenticationService,
    private notification: NotificationsService,
    private db: DatabaseService
  ) {
    this.authenticationService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }

  data$ = this.db.getUsers();
  colums = [
    { key: 'username', header: 'Username' },
    { key: 'name', header: 'Firstname' },
    { key: 'surname', header: 'Lastname' },
    { key: 'email', header: 'Email'},
    { key: 'phone', header: 'Phone'}
  ];

  applyFilter(value: any) {
    this.filterStr = value;
  }

  createUser() {
    this.dialogs.openCreateUserDialog({ title: 'Add new user' }).pipe(
      filter(Boolean)
    )
      .subscribe(res => {
        this.db.addUser(res);
        this.notification.successNotification('User added');
      });
  }
}
