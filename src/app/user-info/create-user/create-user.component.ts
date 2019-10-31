import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ControlsService } from 'src/app/shared/controls.service';
import { passValidator } from './password.validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
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
    const names = ['name', 'surname', 'phone', 'address', 'username', 'password', 'confirmPassword'];
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
    this.dialogRef.close(this.form.valid ? result : null);
  }


}
