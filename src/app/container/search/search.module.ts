import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { TableModule } from 'src/app/shared/table/table.module';
import { AdditionalInfoTableComponent } from './additional-info-table/additional-info-table.component';



@NgModule({
  declarations: [SearchComponent, AdditionalInfoTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class SearchModule { }
