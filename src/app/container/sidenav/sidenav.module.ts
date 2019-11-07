import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MaterialModule } from 'src/app/material.module';
import { UserInfoComponent } from '../user-info/user-info.component';
import { DialogsModule } from 'src/app/shared/dialogs/dialogs.module';
import { TableModule } from 'src/app/shared/table/table.module';
import { MainComponent } from '../main/main.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SidenavComponent,
    UserInfoComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DialogsModule,
    TableModule,
    RouterModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
