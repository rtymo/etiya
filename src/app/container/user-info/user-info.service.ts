import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserInfoService {
  private messageSource = new BehaviorSubject({});
  currentUser = this.messageSource.asObservable();

  constructor() { }

  sendInformation(message: Object) {
    this.messageSource.next(message)
  }
}
