import { Component, OnInit } from '@angular/core';
import { DialogsService } from '../../shared/dialogs/dialogs.service';
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private dialogs: DialogsService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationsService: NotificationsService
  ) { }

  login() {
    this.dialogs.openSignInDialog({ title: 'Sign In' }).pipe(
      filter(Boolean)
    ).subscribe(()=> this.notificationsService.successNotification('Login is successful'))
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
