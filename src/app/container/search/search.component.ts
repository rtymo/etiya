import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/db.service';
import { Subject, combineLatest, Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  startAt = new Subject();
  endAt = new Subject();

  startObs = this.startAt.asObservable();
  endObs = this.endAt.asObservable();

  names;

  public data: Observable<any[]>;
  constructor(
    private db: DatabaseService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    combineLatest(this.startObs, this.endObs).subscribe((value) => {
      this.db.searchUsersInFirestore(value[0], value[1]).subscribe((names) => {this.names = names;
    })
    })
  }

  get f() { return this.form.controls; }

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
    if(q) {
      console.log(q)
    }
    
    // this.startAt.next(q);
    // this.endAt.next(q + "\uf8ff");
  }

}
