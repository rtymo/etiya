import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NotificationsComponent } from './/notifications.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  showGrowl(message: string, iconName: string, className: string) {
    this.config['data'] = [message, iconName];
    this.config['panelClass'] = [className];
    this.snackBar.openFromComponent(NotificationsComponent, this.config);
  }

  successNotification(message: string) {
    this.showGrowl(message, 'done', 'success_notification');
  }

  warningNotification(message: string) {
    this.showGrowl(message, 'warning', 'warning_notification');
  }

  errorNotification(message: string) {
    this.showGrowl(message, 'error_outline', 'error_notification');
  }
}
