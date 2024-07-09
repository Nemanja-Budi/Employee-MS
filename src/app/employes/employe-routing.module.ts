import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeComponent } from './employe/employe.component';
import { EmployeSalaryComponent } from './employe-salary/employe-salary.component';
import { EmployeAddComponent } from './employe/employe-add/employe-add.component';
import { EmployeDetailComponent } from './employe/employe-detail/employe-detail.component';
import { EmployeSalaryAddComponent } from './employe-salary/employe-salary-add/employe-salary-add.component';
import { EmployeSalaryDetailComponent } from './employe-salary/employe-salary-detail/employe-salary-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'employe-list', pathMatch: 'full' },
  { path: 'employe-list', component: EmployeComponent },
  { path: 'employe-add', component: EmployeAddComponent},
  { path: 'employe-edit/:id', component: EmployeAddComponent},
  { path: 'employe-detail/:id', component: EmployeDetailComponent},
  { path: 'employe-salarys', component: EmployeSalaryComponent },
  { path: 'employe-create-salary', component: EmployeSalaryAddComponent},
  { path: 'employe-create-salary/:id', component: EmployeSalaryAddComponent},
  { path: 'employe-detail-salary/:id', component: EmployeSalaryDetailComponent},
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
export class EmployeRoutingModule { }
