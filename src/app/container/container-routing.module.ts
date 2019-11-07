import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { AuthGuard } from '../auth/admin.guard';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';

export const containerRoutes: Routes = [
  { path: '', redirectTo: 'user-info', pathMatch: 'full' },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  { path: 'search', component: SearchComponent}
];

@NgModule({
  exports: [ RouterModule ]
})
export class ContainerRoutingModule { }
