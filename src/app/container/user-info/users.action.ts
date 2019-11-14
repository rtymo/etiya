import { User } from 'src/app/shared/user.interface';

export class GetUsers {
  static readonly type = '[Users] Get';
}

export class GetUser {
  static readonly type = '[User] Get'

  constructor(public readonly payload: User){}
}
