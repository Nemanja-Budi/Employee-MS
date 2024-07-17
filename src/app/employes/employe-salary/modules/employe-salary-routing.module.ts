import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeSalaryAddComponent } from '../employe-salary-add/employe-salary-add.component';
import { EmployeSalaryDetailComponent } from '../employe-salary-detail/employe-salary-detail.component';
import { EmployeSalaryComponent } from '../employe-salary.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-salarys', pathMatch: 'full' },
  { path: 'all-salarys', component: EmployeSalaryComponent },
  { path: 'create-salary', component: EmployeSalaryAddComponent},
  { path: 'update-salary/:id', component: EmployeSalaryAddComponent},
  { path: 'create-salary/:employeId', component: EmployeSalaryAddComponent},
  { path: 'detail-salary/:id', component: EmployeSalaryDetailComponent},
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
export class EmployeSalaryRoutingModule { }
