import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { EmployesRoutingModule } from './employes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployesRoutingModule,
    //ReactiveFormsModule,
    SharedModule
  ],
  exports: []
})
export class EmployesModule { }
