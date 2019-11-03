import { Component, OnInit, Inject } from '@angular/core';
import { ControlsService } from 'src/app/shared/controls.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateUserComponent } from '../../container/user-info/create-user/create-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  makeControl = this.controls.makeControl(this.initData.data);
  returnUrl: string;
  error = '';
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private controls: ControlsService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  get f() { return this.form.controls; }

  onOkClick() {
    const result = {
      ...this.initData.user,
      ...this.form.value
    };
    this.dialogRef.close(this.form.valid ? result : null);
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });
  }

}
