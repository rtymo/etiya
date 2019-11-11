import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from '../user.interface';
import { CreateUserComponent } from '../../container/user-info/create-user/create-user.component';
import { LoginComponent } from '../../auth/login/login.component';
import { EditUserComponent } from 'src/app/container/user-info/edit-user/edit-user.component';
import { EditAdditionalInfoComponent } from 'src/app/container/user-info/address-info/edit-additional-info/edit-additional-info.component';

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

  openEditUserDialog({
    user = {},
    title = 'Edit user',
  } = {}): Observable<User | null> {
    return this.openDialog(EditUserComponent, title, user);
  }

  openEditAdditionalInfoDialog({
    user = {},
    title = 'Edit additional information',
  } = {}): Observable<User | null> {
    return this.openDialog(EditAdditionalInfoComponent, title, user);
  }

}
