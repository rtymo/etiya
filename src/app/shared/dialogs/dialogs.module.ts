import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsService } from './dialogs.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule,
         MatDialogModule, MatNativeDateModule, MatFormFieldModule, MatIconModule,
         MatInputModule, MatRadioModule, MatSelectModule, MAT_DIALOG_DATA
       } from '@angular/material';
import { ControlsService } from '../controls.service';
import { CreateUserComponent } from '../../container/user-info/create-user/create-user.component';
import { LoginComponent } from '../../auth/login/login.component';
import { AddressInfoComponent } from 'src/app/container/user-info/address-info/address-info.component';
import { EditUserComponent } from 'src/app/container/user-info/edit-user/edit-user.component';
import { EditAdditionalInfoComponent } from 'src/app/container/user-info/address-info/edit-additional-info/edit-additional-info.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { AddAdditionalInfoComponent } from 'src/app/container/user-info/address-info/add-additional-info/add-additional-info.component';


@NgModule({
  declarations: [
    CreateUserComponent,
    LoginComponent,
    AddressInfoComponent,
    EditUserComponent,
    EditAdditionalInfoComponent,
    AddAdditionalInfoComponent,
    ConfirmationComponent
  ],
  entryComponents: [
    CreateUserComponent,
    LoginComponent,
    EditUserComponent,
    EditAdditionalInfoComponent,
    AddAdditionalInfoComponent,
    ConfirmationComponent
  ],
  providers: [
    DialogsService,
    ControlsService,
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ]
})
export class DialogsModule { }
