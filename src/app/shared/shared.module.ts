import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { EmployeSelectComponent } from './components/employe-select/employe-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowItemsPerPageComponent } from './components/show-items-per-page/show-items-per-page.component';
import { EmployeSalaryEmployeDetailComponent } from './components/employe-salary-employe-detail/employe-salary-employe-detail.component';
import { PaganationComponent } from './components/paganation/paganation.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { ChangeInputTypeDirective } from './directives/change-input-type.directive';
import { UserInfoComponent } from './components/user-info/user-info.component';


@NgModule({
  declarations: [
    ValidationMessagesComponent, 
    ShowMoreComponent, 
    EmployeSelectComponent, 
    ShowItemsPerPageComponent, 
    EmployeSalaryEmployeDetailComponent,
    PaganationComponent,
    FilterComponent,
    SearchComponent,
    ChangeInputTypeDirective,
    UserInfoComponent
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
    EmployeSalaryEmployeDetailComponent,
    FilterComponent,
    SearchComponent,
    PaganationComponent,
    ChangeInputTypeDirective,
    UserInfoComponent
  ]
})
export class SharedModule { }
