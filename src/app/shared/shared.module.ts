import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { EmployeSelectComponent } from './components/employe-select/employe-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowItemsPerPageComponent } from './components/show-items-per-page/show-items-per-page.component';
import { EmployeItemComponent } from './components/employe-item/employe-item.component';
import { EmployeSalaryEmployeDetailComponent } from './components/employe-salary-employe-detail/employe-salary-employe-detail.component';


@NgModule({
  declarations: [
    ValidationMessagesComponent, 
    ShowMoreComponent, 
    EmployeSelectComponent, 
    ShowItemsPerPageComponent, 
    EmployeItemComponent, 
    EmployeSalaryEmployeDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ValidationMessagesComponent, 
    ShowMoreComponent, 
    EmployeSelectComponent, 
    ReactiveFormsModule,
    ShowItemsPerPageComponent,
    EmployeItemComponent,
    EmployeSalaryEmployeDetailComponent
  ]
})
export class SharedModule { }
