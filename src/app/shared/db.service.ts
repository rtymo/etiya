import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  addUser(user) {
    return this.afs.collection('users').add(user);
  }

  getUsers() {
    return this.afs.collection('users').valueChanges();
  };

}
