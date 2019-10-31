import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/shared/dialogs.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private dialogs: DialogsService,
  ) { }

  login() {
    this.dialogs.openSignInDialog({title: 'Sign In'}).pipe(
      filter(Boolean)
    )
    .subscribe(res => {
      console.log(res)
    });
  }

}
