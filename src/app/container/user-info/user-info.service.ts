import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserInfoService {
  private messageSource = new BehaviorSubject({});
  currentUser = this.messageSource.asObservable();

  sendInformation(message) {
    this.messageSource.next(message)
  }

}
