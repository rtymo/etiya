import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  fetchDoc(collection: string, id: string, docId?: string): Observable<any> {
    return this.afs
      .collection(collection)
      .doc(id)
      .valueChanges()
      .pipe(map(doc => ({ ...doc, id, docId })));
  }

  fetchCollection(collection: string, query?): Observable<any[]> {
    return this.afs
      .collection(collection, query)
      .snapshotChanges()
      .pipe(
        map(snapshots =>
          snapshots.map(snap => ({
            ...snap.payload.doc.data(),
            id: snap.payload.doc.id
          }))
        )
      );
  }

  addUser(user) {
    return this.afs.collection("users").add(user);
  }

  getUser(id: string) {
    return this.fetchDoc("users", id);
  }

  getUsers() {
    return this.fetchCollection("users").pipe(
      map(users => users.map(user => user))
    );
  }

  updateUser(user): Promise<void> {
    return this.afs.doc(`users/${user.id}`).update(user);
  }

  updateAdditionalInfo(user) {
    return this.afs.doc(`users/${user.id}`).update(user)
  }

  deleteUser(id) {
    this.afs.doc(`users/${id}`).delete();
  }

  getUserByCity(id: string) {
    return this.fetchCollection('users', ref => ref.where('city', '==', id));
  }

  searchUsersInFirestore(start, end){
    return this.afs.collection('users', ref => ref.limit(4).orderBy('name').startAt(start).endAt(end)).snapshotChanges().pipe(
      map(snapshots =>
        snapshots.map(snap => ({
          ...snap.payload.doc.data(),
          id: snap.payload.doc.id
        }))
      )
    );
  };

}
