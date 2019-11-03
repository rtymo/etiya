import { Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string[],
    public snackBar: MatSnackBar
  ) { }

  dismissNotification() {
    this.snackBar.dismiss();
  }

}
