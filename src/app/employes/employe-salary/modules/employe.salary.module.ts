import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeSalaryAddComponent } from '../employe-salary-add/employe-salary-add.component';
import { EmployeSalaryDetailComponent } from '../employe-salary-detail/employe-salary-detail.component';
import { EmployeSalaryComponent } from '../employe-salary.component';
import { EmployeSalaryRoutingModule } from './employe-salary-routing.module';
import { EmployeSalaryListComponent } from '../employe-salary-list/employe-salary-list.component';
import { SharedModule } from "../../../shared/shared.module";
import { EmployeSalaryPdfComponent } from '../employe-salary-detail/employe-salary-pdf/employe-salary-pdf.component';
import { EmployeSalarySearchComponent } from '../employe-salary-search/employe-salary-search.component';



@NgModule({
  declarations: [
    EmployeSalaryComponent,
    EmployeSalaryAddComponent,
    EmployeSalaryDetailComponent,
    EmployeSalaryListComponent,
    EmployeSalaryPdfComponent,
    EmployeSalarySearchComponent
  ],
  imports: [
    CommonModule,
    EmployeSalaryRoutingModule,
    SharedModule
]
})
export class EmployeSalaryModule { }
