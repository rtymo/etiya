import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../shared/dialogs.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { User } from '../shared/user.interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  currentUser: User;
  constructor(
    private dialogs: DialogsService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  createUser() {
    this.dialogs.openCreateUserDialog({ title: 'Add new user' }).pipe(
      filter(Boolean)
    )
      .subscribe(res => {
        console.log(res)
      });
  }

}
