import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../material.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { ContainerRoutingModule } from './container-routing.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    ContainerComponent,
    HeaderComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SidenavModule,
    ContainerRoutingModule
  ]
})
export class ContainerModule { }
