import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { EmployeAddComponent } from '../employe-add/employe-add.component';
import { EmployeDetailComponent } from '../employe-detail/employe-detail.component';
import { EmployeChildComponent } from '../employe-list/employe-child/employe-child.component';
import { EmployeListComponent } from '../employe-list/employe-list.component';
import { EmployeComponent } from '../employe.component';
import { EmployeRoutingModule } from './employe-routing.module';
import { EmployeModalComponent } from '../employe-modal/employe-modal.component';
import { EmployeItemComponent } from '../employe-item/employe-item.component';

@NgModule({
  declarations: [
    EmployeComponent,
    EmployeAddComponent,
    EmployeChildComponent,
    EmployeDetailComponent,
    EmployeListComponent,
    EmployeModalComponent,
    EmployeItemComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeRoutingModule,
    SharedModule
  ],
  exports:[EmployeItemComponent]

})
export class EmployeModule { }
