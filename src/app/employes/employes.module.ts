import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AnnualLeaveComponent } from './annual-leaves/annual-leave/annual-leave.component';
import { EmployesRoutingModule } from './employes-routing.module';

@NgModule({
  declarations: [
    AnnualLeaveComponent,
  ],
  imports: [
    CommonModule,
    EmployesRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployesModule { }
