import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { of } from 'rxjs';
import { DatabaseService } from 'src/app/shared/db.service';
import { User } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-additional-info-table',
  templateUrl: './additional-info-table.component.html',
  styleUrls: ['./additional-info-table.component.css']
})
export class AdditionalInfoTableComponent implements OnInit {
  @Input() data: User;

  // userID = this.data.id
  additionalInfo$;

  additionalColumns = [
    { key: "addressType", header: "Address Type" },
    { key: "address", header: "Address" },
    { key: "country", header: "Country" },
    { key: "city", header: "City" },
    { key: "postalCode", header: "Postal Code" }
  ]

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.getUser("Sxg98mxL98eTi3flhbW7").subscribe((res) => {
      this.additionalInfo$ = of([res])
      console.log(this.additionalInfo$)
    })
  }

  ngOnChanges(){
    // let change: SimpleChange = changes['data'];

    // this.additionalInfo = this.data;
    // console.log(this.data.id)

  }

  test() {
    // console.log(this.data.id)
    // this.db.getUser("Sxg98mxL98eTi3flhbW7").subscribe((res) => {
    //   this.additionalInfo$ = of([res])
    // })
  }
}
