import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { DialogsModule } from '../../shared/dialogs/dialogs.module';
import { MaterialModule } from '../../material.module';
import { TableModule } from '../../shared/table/table.module';

@NgModule({
  declarations: [
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    DialogsModule,
    MaterialModule,
    TableModule
  ]
})
export class UserModule { }
