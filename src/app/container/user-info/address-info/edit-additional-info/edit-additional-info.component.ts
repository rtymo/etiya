import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from '../../create-user/create-user.component';
import { ControlsService } from 'src/app/shared/controls.service';
import { DatabaseService } from 'src/app/shared/db.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { DialogsService } from 'src/app/shared/dialogs/dialogs.service';


@Component({
  selector: 'app-edit-additional-info',
  templateUrl: './edit-additional-info.component.html',
  styleUrls: ['./edit-additional-info.component.css']
})
export class EditAdditionalInfoComponent implements OnInit {
  form: FormGroup;
  makeControl = this.controls.makeControl(this.initData.data);
  addressTypes = ['Home', 'Work']
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private controls: ControlsService,
    private db: DatabaseService,
    private notifications: NotificationsService,
    private dialogs: DialogsService,
    @Inject(MAT_DIALOG_DATA) public initData
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const names = ['name', 'country', 'city', 'postalCode'];
    const requiredControls = this.controls.makeRequiredControls(this.initData.data, names);

    const makeControl = this.controls.makeControl(this.initData.data);

    this.form = this.formBuilder.group({
      ...requiredControls,
      ...makeControl('city', Validators.required, Validators.minLength(4)),
      ...makeControl('postalCode', Validators.required, Validators.minLength(5), Validators.pattern("^[0-9]*$")),
    });
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  onOkClick() {
    const result = {
      ...this.form.value
    };
    this.dialogRef.close(this.form.valid ? result : null);
  }


  deleteAddress() {
    this.dialogRef.close(null);
    this.dialogs.openConfirmationDialog().subscribe(data => {
      if (data) {
        this.db.deleteAdditionalInfo(this.initData.data, this.initData.data.id)
        this.notifications.successNotification("User was removed");
      }
    });
  }

}
