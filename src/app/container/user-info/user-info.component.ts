import { Component } from '@angular/core';
import { DialogsService } from '../../shared/dialogs/dialogs.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';
import { User } from '../../shared/user.interface';
import data from '../../shared/users.json';
import { of } from 'rxjs';
import { NotificationsService } from '../../shared/notifications/notifications.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  currentUser: User;
  filterStr = '';
  users = data;

  constructor(
    private dialogs: DialogsService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NotificationsService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  data$ = of(this.users);
  colums = [
    { key: 'username', header: 'Username' },
    { key: 'name', header: 'Firstname' },
    { key: 'surname', header: 'Lastname' }
  ];

  applyFilter(value: any) {
    this.filterStr = value;
  }

  createUser() {
    this.dialogs.openCreateUserDialog({ title: 'Add new user' }).pipe(
      filter(Boolean)
    )
      .subscribe(res => {
        console.log(res)
        this.notification.successNotification('User added');
      });
  }
}
