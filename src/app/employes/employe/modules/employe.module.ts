import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { EmployeAddComponent } from '../employe-add/employe-add.component';
import { EmployeDetailComponent } from '../employe-detail/employe-detail.component';
import { EmployeChildComponent } from '../employe-list/employe-child/employe-child.component';
import { EmployeListComponent } from '../employe-list/employe-list.component';
import { EmployeComponent } from '../employe.component';
import { EmployeFilterComponent } from '../employe-filter/employe-filter.component';
import { EmployeSearchComponent } from '../employe-search/employe-search.component';
import { EmployeRoutingModule } from './employe-routing.module';
import { EmployePaganationComponent } from '../employe-paganation/employe-paganation.component';
import { EmployeModalComponent } from '../employe-modal/employe-modal.component';

@NgModule({
  declarations: [
    EmployeComponent,
    EmployeAddComponent,
    EmployeChildComponent,
    EmployeDetailComponent,
    EmployeListComponent,
    EmployeFilterComponent,
    EmployeSearchComponent,
    EmployePaganationComponent,
    EmployeModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeRoutingModule,
    SharedModule
  ]
})
export class EmployeModule { }
