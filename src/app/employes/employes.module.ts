import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployesRoutingModule } from './employes-routing.module';
import { SharedModule } from '../shared/shared.module';

import { EmployesComponent } from './employes.component';
import { EmployesNavbarComponent } from './employes-navbar/employes-navbar.component';

//PREGLEDANO OKE

@NgModule({
  declarations: [
    EmployesComponent,
    EmployesNavbarComponent   
  ],
  imports: [
    CommonModule,
    EmployesRoutingModule,
    SharedModule,
],
  exports: []
})
export class EmployesModule { }
