import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnnualLeaveComponent } from './annual-leave/annual-leave.component';
import { AnnualLeaveCreateComponent } from './annual-leave-create/annual-leave-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-annual-leaves', pathMatch: 'full' },
  { path: 'all-annual-leaves', component: AnnualLeaveComponent},

  { path: 'update-annual-leave/:annualleaveId', component: AnnualLeaveCreateComponent},
  { path: 'create-annual-leave', component: AnnualLeaveCreateComponent},
  { path: 'create-annual-leave/:employeId', component: AnnualLeaveCreateComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AnnualLeaveRoutingModule { }
