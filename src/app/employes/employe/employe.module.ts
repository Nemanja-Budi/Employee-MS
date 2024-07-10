import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeAddComponent } from './employe-add/employe-add.component';
import { EmployeDetailComponent } from './employe-detail/employe-detail.component';
import { EmployeChildComponent } from './employe-list/employe-child/employe-child.component';
import { EmployeListComponent } from './employe-list/employe-list.component';
import { EmployeComponent } from './employe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeRoutingModule } from './employe-routing.module';



@NgModule({
  declarations: [
    EmployeComponent,
    EmployeAddComponent,
    EmployeChildComponent,
    EmployeDetailComponent,
    EmployeListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeRoutingModule
  ]
})
export class EmployeModule { }
