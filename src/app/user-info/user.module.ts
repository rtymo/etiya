import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { DialogsModule } from '../shared/dialogs.module';

@NgModule({
  declarations: [
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    DialogsModule
  ]
})
export class UserModule { }
