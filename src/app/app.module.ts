import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeComponent } from './employes/employe/employe.component';
import { EmployeSalaryComponent } from './employes/employe-salary/employe-salary.component';
import { EmployeChildComponent } from './employes/employe/employe-child/employe-child.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { EmployeSalaryAddComponent } from './employes/employe-salary/employe-salary-add/employe-salary-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeAddComponent } from './employes/employe/employe-add/employe-add.component';
import { EmployeSalaryDetailComponent } from './employes/employe-salary/employe-salary-detail/employe-salary-detail.component';
import { EmployeDetailComponent } from './employes/employe/employe-detail/employe-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeComponent,
    EmployeSalaryComponent,
    EmployeChildComponent,
    HeaderComponent,
    FooterComponent,
    EmployeSalaryAddComponent,
    EmployeAddComponent,
    EmployeSalaryDetailComponent,
    EmployeDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
