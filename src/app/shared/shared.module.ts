import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { EmployeSelectComponent } from './components/employe-select/employe-select.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ValidationMessagesComponent, ShowMoreComponent, EmployeSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ValidationMessagesComponent, ShowMoreComponent, EmployeSelectComponent, ReactiveFormsModule]
})
export class SharedModule { }
