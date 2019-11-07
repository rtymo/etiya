import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../material.module';
import { SidenavModule } from './sidenav/sidenav.module';


@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SidenavModule
  ]
})
export class ContainerModule { }
