import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from '../create-user/create-user.component';
import { ControlsService } from '../../../shared/controls.service';
import { UserInfoService } from '../user-info.service';
import countries from '../../../shared/countries.json';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.css']
})
export class AddressInfoComponent implements OnInit {
  form: FormGroup;
  countries = countries;
  makeControl = this.controls.makeControl(this.initData.data);

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private controls: ControlsService,
    private userInfoService: UserInfoService,
    @Inject(MAT_DIALOG_DATA) public initData
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const names = ['addressType', 'address', 'city', 'postalCode', 'country'];
    const requiredControls = this.controls.makeRequiredControls(this.initData.data, names);

    this.form = this.formBuilder.group({
      ...requiredControls
    });
  }
  save() {
    this.userInfoService.currentUser.subscribe(data => {
      const result = {
        ...this.initData.user,
        ...this.form.value
      };
      const user = {
        ...data,
        ...result
      }
      this.dialogRef.close(this.form.valid ? user : null);
    })
  }
}
