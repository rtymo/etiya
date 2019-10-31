import { Component, OnInit, Inject } from '@angular/core';
import { ControlsService } from 'src/app/shared/controls.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from 'src/app/user-info/create-user/create-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
    const names = ['username', 'password'];
    const requiredControls = this.controls.makeRequiredControls(this.initData.data, names);

    this.form = this.formBuilder.group({
      ...requiredControls,
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
