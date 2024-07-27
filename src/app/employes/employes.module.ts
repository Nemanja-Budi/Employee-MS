import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployesRoutingModule } from './employes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ 
  ],
  imports: [
    CommonModule,
    EmployesRoutingModule,
    //SharedModule
  ],
  exports: []
})
export class EmployesModule { }
