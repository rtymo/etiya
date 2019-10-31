import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DialogsModule } from '../shared/dialogs.module';
import { DialogsService } from '../shared/dialogs.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogsModule
  ]
})
export class AuthModule { }
