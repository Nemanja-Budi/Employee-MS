import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeRoutingModule } from './employe-routing.module';
import { EmployeSalaryAddComponent } from './employe-salary/employe-salary-add/employe-salary-add.component';
import { EmployeSalaryDetailComponent } from './employe-salary/employe-salary-detail/employe-salary-detail.component';
import { EmployeSalaryComponent } from './employe-salary/employe-salary.component';
import { EmployeAddComponent } from './employe/employe-add/employe-add.component';
import { EmployeDetailComponent } from './employe/employe-detail/employe-detail.component';
import { EmployeChildComponent } from './employe/employe-list/employe-child/employe-child.component';
import { EmployeListComponent } from './employe/employe-list/employe-list.component';
import { EmployeComponent } from './employe/employe.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeComponent,
    EmployeSalaryComponent,
    EmployeChildComponent,
    EmployeSalaryAddComponent,
    EmployeAddComponent,
    EmployeSalaryDetailComponent,
    EmployeDetailComponent,
    EmployeListComponent,
  ],
  imports: [
    CommonModule,
    EmployeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeModule { }
