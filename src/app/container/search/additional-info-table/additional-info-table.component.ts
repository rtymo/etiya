import { Component, Input, SimpleChange, OnInit } from "@angular/core";
import { User } from "src/app/shared/user.interface";
import { DatabaseService } from "src/app/shared/db.service";
import { DialogsService } from "src/app/shared/dialogs/dialogs.service";
import { filter } from "rxjs/operators";
import { NotificationsService } from "src/app/shared/notifications/notifications.service";
import { of } from "rxjs";

@Component({
  selector: "app-additional-info-table",
  templateUrl: "./additional-info-table.component.html",
  styleUrls: ["./additional-info-table.component.css"]
})
export class AdditionalInfoTableComponent {
  @Input() data: User;

  dataSource$;

  additionalColumns = [
    { key: "addressType", header: "addressType" },
    { key: 'addresses', header: "AddressTypes"},
    { key: "country", header: "country" },
    { key: "city", header: "city" },
    { key: "postalCode", header: "postalCode" }
  ];
  constructor(
    private db: DatabaseService,
    private dialogs: DialogsService,
    private notifications: NotificationsService
  ) {}

  ngOnChanges(changes) {
    this.dataSource$ = of([changes.data.currentValue]);
    console.log(changes.data.currentValue)
  }

  editAddress(user) {
    this.dialogs
      .openEditAdditionalInfoDialog({ user })
      .pipe(filter(Boolean))
      .subscribe(res => {
        this.db.updateAdditionalInfo(res);
        this.notifications.successNotification(
          "Additional information was updated"
        );
      });
  }
}
