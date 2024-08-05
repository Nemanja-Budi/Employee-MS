import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnualLeaveComponent } from './annual-leave/annual-leave.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnnualLeaveRoutingModule } from './annual-leave-routing.module';
import { AnnualLeaveCreateComponent } from './annual-leave-create/annual-leave-create.component';

@NgModule({
  declarations: [AnnualLeaveComponent, AnnualLeaveCreateComponent],
  imports: [
    CommonModule,
    AnnualLeaveRoutingModule,
    SharedModule,
  ]
})
export class AnnualLeaveModule { }
