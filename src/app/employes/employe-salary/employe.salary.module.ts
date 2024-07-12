import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeSalaryAddComponent } from './employe-salary-add/employe-salary-add.component';
import { EmployeSalaryDetailComponent } from './employe-salary-detail/employe-salary-detail.component';
import { EmployeSalaryComponent } from './employe-salary.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeSalaryRoutingModule } from './employe-salary-routing.module';
import { EmployeSalarySelectComponent } from './employe-salary-select/employe-salary-select.component';



@NgModule({
  declarations: [
    EmployeSalaryComponent,
    EmployeSalaryAddComponent,
    EmployeSalaryDetailComponent,
    EmployeSalarySelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeSalaryRoutingModule
  ]
})
export class EmployeSalaryModule { }
