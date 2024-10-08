import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { EmployeSelectComponent } from './components/employe-select/employe-select.component';

import { ShowItemsPerPageComponent } from './components/show-items-per-page/show-items-per-page.component';
import { EmployeSalaryEmployeDetailComponent } from './components/employe-salary-employe-detail/employe-salary-employe-detail.component';
import { PaganationComponent } from './components/paganation/paganation.component';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { ChangeInputTypeDirective } from './directives/change-input-type.directive';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EnterPerPageComponent } from './components/enter-per-page/enter-per-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserHasRoleDirective } from './directives/user-has-role.directive';
import { BanksForEmployeComponent } from './components/banks-for-employe/banks-for-employe.component';

//PREGLEDANO OKE

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
    UserInfoComponent,
    SpinnerComponent,
    EnterPerPageComponent,
    FooterComponent,
    UserHasRoleDirective,
    BanksForEmployeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule
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
    UserInfoComponent,
    NgSelectModule,
    SpinnerComponent,
    EnterPerPageComponent,
    FooterComponent,
    UserHasRoleDirective,
    BanksForEmployeComponent
  ]
})
export class SharedModule { }
