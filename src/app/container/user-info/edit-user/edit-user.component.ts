import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ControlsService } from 'src/app/shared/controls.service';
import { UserInfoService } from '../user-info.service';
import { passValidator } from '../create-user/password.validator';

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
    @Inject(MAT_DIALOG_DATA) public initData
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const names = ['name', 'surname', 'phone', 'username', 'password', 'confirmPassword'];
    const requiredControls = this.controls.makeRequiredControls(this.initData.data, names);

    const makeControl = this.controls.makeControl(this.initData.data);

    this.form = this.formBuilder.group({
      ...requiredControls,
      ...makeControl('email', Validators.required, Validators.email),
      ...makeControl('phone', Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")),
      ...makeControl('confirmPassword', Validators.required, passValidator)
    });
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  onOkClick() {

    const result = {
      ...this.initData.user,
      ...this.form.value
    };
    console.log(result)
  }

}
