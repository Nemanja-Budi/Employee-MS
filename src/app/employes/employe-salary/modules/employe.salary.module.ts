import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeSalaryAddComponent } from '../employe-salary-add/employe-salary-add.component';
import { EmployeSalaryDetailComponent } from '../employe-salary-detail/employe-salary-detail.component';
import { EmployeSalaryComponent } from '../employe-salary.component';
import { EmployeSalaryRoutingModule } from './employe-salary-routing.module';
import { EmployeSalaryListComponent } from '../employe-salary-list/employe-salary-list.component';
import { SharedModule } from "../../../shared/shared.module";
import { EmployeSalaryPdfComponent } from '../employe-salary-detail/employe-salary-pdf/employe-salary-pdf.component';
import { EmployeModule } from '../../employe/modules/employe.module';
import { EmployeSalaryDetailIfwComponent } from '../employe-salary-detail/employe-salary-detail-ifw/employe-salary-detail-ifw.component';
import { EmployeSalaryDetailSoeComponent } from '../employe-salary-detail/employe-salary-detail-soe/employe-salary-detail-soe.component';
import { EmployeSalaryDetailSoComponent } from '../employe-salary-detail/employe-salary-detail-so/employe-salary-detail-so.component';
import { EmployeSalaryDetailHoursComponent } from '../employe-salary-detail/employe-salary-detail-hours/employe-salary-detail-hours.component';
import { EmployeSalarysSelectComponent } from '../employe-salarys-select/employe-salarys-select.component';
import { EmployeSalaryActionComponent } from '../employe-salary-action/employe-salary-action.component';

@NgModule({
  declarations: [
    EmployeSalaryComponent,
    EmployeSalaryAddComponent,
    EmployeSalaryDetailComponent,
    EmployeSalaryListComponent,
    EmployeSalaryPdfComponent,
    EmployeSalaryDetailIfwComponent,
    EmployeSalaryDetailSoeComponent,
    EmployeSalaryDetailSoComponent,
    EmployeSalaryDetailHoursComponent,
    EmployeSalarysSelectComponent,
    EmployeSalaryActionComponent
  ],
  imports: [
    CommonModule,
    EmployeSalaryRoutingModule,
    SharedModule,
    EmployeModule
]
})
export class EmployeSalaryModule { }
