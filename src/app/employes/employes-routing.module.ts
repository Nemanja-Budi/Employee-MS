import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnualLeaveComponent } from './annual-leaves/annual-leave/annual-leave.component';

const routes: Routes = [
  { path: '', redirectTo: 'employe', pathMatch: 'full' },
  { path: 'employe', loadChildren: () => import('./employe/employe.module').then(m => m.EmployeModule) },
  { path: 'salary', loadChildren: () => import('./employe-salary/employe.salary.module').then(m => m.EmployeSalaryModule) },
  { path: 'annual-leaves', component: AnnualLeaveComponent},

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
export class EmployesRoutingModule { }