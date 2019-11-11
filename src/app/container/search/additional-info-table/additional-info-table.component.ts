import { Component, Input, SimpleChange } from "@angular/core";
import { User } from "src/app/shared/user.interface";
import { DatabaseService } from 'src/app/shared/db.service';
import { DialogsService } from 'src/app/shared/dialogs/dialogs.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: "app-additional-info-table",
  templateUrl: "./additional-info-table.component.html",
  styleUrls: ["./additional-info-table.component.css"]
})
export class AdditionalInfoTableComponent {
  @Input() data: User;

  dataSource;

  // additionalColumns = [
  //   { key: "addressType", header: "Address Type" },
  //   { key: "address", header: "Address" },
  //   { key: "country", header: "Country" },
  //   { key: "city", header: "City" },
  //   { key: "postalCode", header: "Postal Code" }
  // ]

  additionalColumns = ["addressType", "country", 'city', 'postalCode', 'actions'];

  constructor(
    private db: DatabaseService,
    private dialogs: DialogsService,
  ) {}


  ngOnChanges(changes: SimpleChange) {
    let change: SimpleChange = changes['data'];
    if (!!this.data) {
      this.dataSource = [
        change.currentValue
      ];
    }
    console.log(change);
  }

  editAddress(user) {
    this.dialogs
      .openEditAdditionalInfoDialog({ user })
      .pipe(filter(Boolean))
      .subscribe(res => {
        console.log(res)
        this.db.updateAdditionalInfo(res);
        // this.notification.successNotification("User updated");
      });
  }

}
