import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/admin.guard';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';

export const containerRoutes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard]}
];

@NgModule({
  exports: [ RouterModule ]
})
export class ContainerRoutingModule { }
