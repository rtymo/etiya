import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../shared/dialogs.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  constructor(
    private dialogs: DialogsService,
  ) { }

  createUser() {
    this.dialogs.openCreateUserDialog({title: 'Add new user'}).pipe(
      filter(Boolean)
    )
    .subscribe(res => {
      console.log(res)
    });
  }

}
