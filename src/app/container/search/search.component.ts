import { Component, OnInit } from "@angular/core";
import { DatabaseService } from "src/app/shared/db.service";
import { Subject, of } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { User } from "src/app/shared/user.interface";
import { pluck, map } from "rxjs/operators";
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
  inputToChild;
  users$;
  constructor(private db: DatabaseService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
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
    this.loaded = false;
  }

  searchInDB(firstValue, secondValue, query) {
    this.db
      .searchUsersInFirestore(firstValue, secondValue, query)
      .subscribe(users => {
        this.users$ = of(users);
        this.loaded = true;
      });
  }

  updateResultTable(startSearch, endSearch, q: string) {
    return this.searchInDB(startSearch, endSearch, q);
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
    const inputNames = Object.keys(this.form.controls);
    inputNames.map(inputName => {
      switch (inputName) {
        case "name":
          if (!!this.f[inputName].value) {
            this.updateResultTable(
              this.f[inputName].value,
              `${this.f[inputName].value}\uf8ff`,
              "name"
            );
          }
          break;
        case "surname":
          if (!!this.f[inputName].value) {
            this.updateResultTable(
              this.f[inputName].value,
              `${this.f[inputName].value}\uf8ff`,
              "surname"
            );
          }
          break;
        case "username":
          if (!!this.f[inputName].value) {
            this.updateResultTable(
              this.f[inputName].value,
              `${this.f[inputName].value}\uf8ff`,
              "username"
            );
          }
          break;
        case "email":
          if (!!this.f[inputName].value) {
            this.updateResultTable(
              this.f[inputName].value,
              `${this.f[inputName].value}\uf8ff`,
              "email"
            );
          }
          break;
        case "phone":
          if (!!this.f[inputName].value) {
            this.updateResultTable(
              this.f[inputName].value,
              `${this.f[inputName].value}\uf8ff`,
              "phone"
            );
          }
          break;
      }
    });
    this.form.reset();
  }

  getAdditionalInfo(targetUser) {
    this.db
      .getUser(targetUser.id)
      .pipe(
        map(({ addressList, id }) => {
          return {
            data: addressList,
            id
          };
        })
      )
      .subscribe(data => {
        this.inputToChild = data;
      });
  }
}
