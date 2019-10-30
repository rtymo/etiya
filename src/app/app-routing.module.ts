import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { UserInfoComponent } from './user-info/user-info.component';


const routes: Routes = [
  { path: '', component: ContainerComponent},
  {path: 'user', component: UserInfoComponent},
  { path: '**', component: ContainerComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
