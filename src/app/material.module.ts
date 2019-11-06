import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatSortModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
