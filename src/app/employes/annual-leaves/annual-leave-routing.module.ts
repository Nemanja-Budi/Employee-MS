import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnnualLeaveComponent } from './annual-leave/annual-leave.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-annual-leaves', pathMatch: 'full' },
  { path: 'all-annual-leaves', component: AnnualLeaveComponent},
  { path: 'annual-leaves/:annualleaveId', component: AnnualLeaveComponent},

  { path: 'create-annual-leave/:employeId', component: AnnualLeaveComponent},
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
