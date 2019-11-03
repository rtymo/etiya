import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { UserInfoComponent } from './container/user-info/user-info.component';
import { AuthGuard } from './auth/admin.guard';


const routes: Routes = [
  { path: '', component: ContainerComponent },
  { path: 'user', component: UserInfoComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
