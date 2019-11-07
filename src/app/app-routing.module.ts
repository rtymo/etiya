import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { containerRoutes } from './container/container-routing.module';


const routes: Routes = [
  { path: '', component: ContainerComponent, children: containerRoutes },
  { path: '**', redirectTo: 'main' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
