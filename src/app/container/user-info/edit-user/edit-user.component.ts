import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ControlsService } from 'src/app/shared/controls.service';
import { UserInfoService } from '../user-info.service';
import { passValidator } from '../create-user/password.validator';
import { DatabaseService } from 'src/app/shared/db.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  form: FormGroup;
  makeControl = this.controls.makeControl(this.initData.data);
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private controls: ControlsService,
    private db: DatabaseService,
    private notifications: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public initData
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const names = ['name', 'surname', 'phone', 'username', 'password', 'confirmPassword', 'id'];
    const requiredControls = this.controls.makeRequiredControls(this.initData.data, names);

    const makeControl = this.controls.makeControl(this.initData.data);

    this.form = this.formBuilder.group({
      ...requiredControls,
      ...makeControl('email', Validators.required, Validators.email),
      ...makeControl('name', Validators.required, Validators.minLength(4)),
      ...makeControl('surname', Validators.required, Validators.minLength(4)),
      ...makeControl('phone', Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")),
      ...makeControl('password', Validators.required, Validators.minLength(6)),
      ...makeControl('confirmPassword', Validators.required, passValidator)
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

  deleteUser() {
    const userID = this.form.value.id;
    this.db.deleteUser(userID);
    this.dialogRef.close(null);
    this.notifications.successNotification('User was removed');
  }

}
