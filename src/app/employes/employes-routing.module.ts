import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'employe', pathMatch: 'full' },
  { path: 'employe', loadChildren: () => import('./employe/modules/employe.module').then(m => m.EmployeModule) },
  { path: 'salary', loadChildren: () => import('./employe-salary/modules/employe.salary.module').then(m => m.EmployeSalaryModule) },
  { path: 'annual-leave', loadChildren: () => import('./annual-leaves/annual-leave.module').then(m => m.AnnualLeaveModule) },
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
