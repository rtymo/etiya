import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DatabaseService } from "src/app/shared/db.service";
import { Subject, combineLatest, Observable, from, of } from "rxjs";
import { AngularFirestore } from "angularfire2/firestore";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { pluck } from "rxjs/operators";

import _ from "lodash";
import { User } from "src/app/shared/user.interface";
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  startAt = new Subject();
  endAt = new Subject();
  loaded: boolean = false;
  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();
  inputToChild: User;
  users$;
  constructor(private db: DatabaseService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    combineLatest(this.startObs, this.endObs).subscribe(value => {
      this.db.searchUsersInFirestore(value[0], value[1]).subscribe(users => {
        this.users$ = of(users);
        this.loaded = true;
      });
    });
  }

  mainColumns = [
    { key: "username", header: "Username" },
    { key: "name", header: "Firstname" },
    { key: "surname", header: "Lastname" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" }
  ];

  get f() {
    return this.form.controls;
  }

  clearForm() {
    this.form.reset();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.minLength(2)],
      surname: ["", Validators.minLength(2)],
      username: ["", Validators.minLength(2)],
      email: ["", Validators.email],
      phone: ["", Validators.minLength(6)]
    });
  }

  search() {
    const values = Object.keys(this.form.controls);
    values.map(value => {
      switch (value) {
        case "name":
          if (!!this.f[value].value) {
            this.prepateToSearch(this.f[value].value);
          }
          break;
        case "surname":
          if (!!this.f[value].value) {
            this.prepateToSearch(this.f[value].value);
          }
          break;
        case "username":
          if (!!this.f[value].value) {
            this.prepateToSearch(this.f[value].value);
          }
          break;
        case "email":
          if (!!this.f[value].value) {
            this.prepateToSearch(this.f[value].value);
          }
          break;
        case "phone":
          if (!!this.f[value].value) {
            this.prepateToSearch(this.f[value].value);
          }
          break;
      }
    });
    this.form.reset();
  }

  prepateToSearch(val) {
    this.startAt.next(val);
    this.endAt.next(val + "\uf8ff");
  }
  getAdditionalInfo(targetUser) {
    this.inputToChild = targetUser;
  }
}
