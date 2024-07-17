import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeSalaryAddComponent } from '../employe-salary-add/employe-salary-add.component';
import { EmployeSalaryDetailComponent } from '../employe-salary-detail/employe-salary-detail.component';
import { EmployeSalaryComponent } from '../employe-salary.component';
import { EmployeSalaryRoutingModule } from './employe-salary-routing.module';
import { EmployeSalaryListComponent } from '../employe-salary-list/employe-salary-list.component';
import { EmployeSalaryListSelectComponent } from '../employe-salary-list/employe-salary-list-select/employe-salary-list-select.component';
import { EmployeSalaryListEmployesComponent } from '../employe-salary-list/employe-salary-list-employes/employe-salary-list-employes.component';

@NgModule({
  declarations: [
    EmployeSalaryComponent,
    EmployeSalaryAddComponent,
    EmployeSalaryDetailComponent,
    EmployeSalaryListComponent,
    EmployeSalaryListSelectComponent,
    EmployeSalaryListEmployesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeSalaryRoutingModule
  ]
})
export class EmployeSalaryModule { }
