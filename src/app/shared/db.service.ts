import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { firestore } from 'firebase';


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

  addUser(data) {
    const user = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: data.password,
      phone: data.phone,
      username: data.username,
      addressList:[
        {
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
          name: data.addressType,
          address: data.address
        }
      ]
    };
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

  updateAdditionalInfo(data, id, previousData) {
    return this.afs.doc(`users/${id}`).update({
      addressList: [data]
    })
  }

  addAdditionalInfo(data, id){
    return this.afs.doc(`users/${id}`).update({
      addressList: firestore.FieldValue.arrayUnion(data)
    })
  }

  deleteAdditionalInfo(data, id){
    return this.afs.doc(`users/${id}`).update({
      addressList: firestore.FieldValue.arrayRemove(data)
    })
  }
  deleteUser(id) {
    this.afs.doc(`users/${id}`).delete();
  }

  searchUsersInFirestore(start, end, query="name"){
    return this.afs.collection('users', ref => ref.limit(4).orderBy(query).startAt(start).endAt(end)).snapshotChanges().pipe(
      map(snapshots =>
        snapshots.map(snap => ({
          ...snap.payload.doc.data(),
          id: snap.payload.doc.id
        }))
      )
    );
  };

}
