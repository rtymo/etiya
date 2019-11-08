import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from 'src/app/shared/db.service';
import { Subject, combineLatest, Observable, from, of } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pluck } from 'rxjs/operators';

import _ from 'lodash'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  startAt = new Subject();
  endAt = new Subject();
  loaded: boolean = false;
  additionalInfo: boolean = false;
  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();
  public inputToChild;

  // @Output() userInfo = new EventEmitter();
  filterStr = "";

  users$;
  additionalinfo$;
  // public data: Observable<any[]>;
  constructor(
    private db: DatabaseService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    combineLatest(this.startObs, this.endObs).subscribe((value) => {
      this.db.searchUsersInFirestore(value[0], value[1]).subscribe((users) => {
        this.users$ = of(users);
        this.loaded = true;
    })
    })
  }

  mainColumns = [
    { key: "username", header: "Username" },
    { key: "name", header: "Firstname" },
    { key: "surname", header: "Lastname" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" }
  ];

  
  get f() { return this.form.controls; }


  applyFilter(value: any) {
    this.filterStr = value;
  }

  clearForm() {
    this.form.reset();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [''],
      surname: [''],
      username: [''],
      email: ['', Validators.email],
      phone: ['']
    })
  }

  search(){
    let q = this.f.name.value;
    this.startAt.next(q);
    this.endAt.next(q + "\uf8ff");
    this.form.reset();
  }

  getAdditionalInfo(targetUser){
    this.inputToChild = targetUser;
    // this.userInfo.emit(targetUser);
    // this.db.getUser(targetUser.id).subscribe((user) => {
    //   this.additionalinfo$ = of(user);
    // })
    // this.additionalinfo$.subscribe((info) => {
    //     console.log(info)
    // })
    // this.users$.subscribe(user =>{
    //   user.map(data => {
    //     // if(targetUser._isEqual(data)){
    //     //   console.log('done');
    //     // }
    //     if(_.isEqual(targetUser, data)){
    //       console.log(data);
    //       console.log(targetUser)
    //       this.additionalinfo$ = of(data);
    //       this.additionalInfo = true;
          // this.applyFilter(data)

      //   }
      // })
      // if(targetUser.id != user.id){
      //   console.log(user.id)
      //   console.log(this.users$[0])

    // })

    // this.db.getUser(user.id)
    //   .subscribe(data=>{
    //     this.additionalinfo$ = of(data);
    //     // this.additionalinfo$.subscribe(data = console.log(data))

    //   })
    //   this.additionalinfo$.subscribe(data=>console.log(data))

  }
}
