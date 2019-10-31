import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { CreateUserComponent } from '../user-info/create-user/create-user.component';
import { LoginComponent } from '../auth/login/login.component';

@Injectable()
export class DialogsService {

  constructor(private matDialog: MatDialog) { }

  openDialog(component, title, data) {
    return this.matDialog.open(
      component,
      {
        disableClose: true,
        autoFocus: true,
        width: '600px',
        data: { title, data }
      }
    ).afterClosed();
  }

  openCreateUserDialog({
    user = {},
    title = 'Create user',
  } = {}): Observable<User | null> {
    return this.openDialog(CreateUserComponent, title, user);
  }

  openSignInDialog({
    user = {},
    title = 'Sign In',
  } = {}): Observable<any> {
    return this.openDialog(LoginComponent, title, user);
  }
  

}
