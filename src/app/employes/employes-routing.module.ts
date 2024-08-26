import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployesComponent } from './employes.component';

//PREGLEDANO OKE

const routes: Routes = [
  { path: '', redirectTo: 'employe', pathMatch: 'full' },
  {
    path: '',
    component: EmployesComponent,
    children: [
      { path: 'employe', loadChildren: () => import('./employe/modules/employe.module').then(m => m.EmployeModule) },
      { path: 'salary', loadChildren: () => import('./employe-salary/modules/employe.salary.module').then(m => m.EmployeSalaryModule) },
      { path: 'annual-leave', loadChildren: () => import('./annual-leaves/annual-leave.module').then(m => m.AnnualLeaveModule) },
    ]
  }
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
