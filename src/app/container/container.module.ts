import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { ContainerRoutingModule } from './container-routing.module';
import { SearchModule } from './search/search.module';


@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SidenavModule,
    SearchModule,
    ContainerRoutingModule
  ]
})
export class ContainerModule { }
