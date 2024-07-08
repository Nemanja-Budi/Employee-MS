import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeComponent } from './employes/employe/employe.component';
import { EmployeSalaryComponent } from './employes/employe-salary/employe-salary.component';
import { EmployeSalaryAddComponent } from './employes/employe-salary/employe-salary-add/employe-salary-add.component';
import { EmployeAddComponent } from './employes/employe/employe-add/employe-add.component';
import { EmployeSalaryDetailComponent } from './employes/employe-salary/employe-salary-detail/employe-salary-detail.component';
import { EmployeDetailComponent } from './employes/employe/employe-detail/employe-detail.component';

const routes: Routes = [
  { path: 'employes', component: EmployeComponent },
  { path: 'employe-add', component: EmployeAddComponent},
  { path: 'employe-edit/:id', component: EmployeAddComponent},
  { path: 'employe-detail/:id', component: EmployeDetailComponent},
  { path: 'salarys', component: EmployeSalaryComponent },
  { path: 'create-salary', component: EmployeSalaryAddComponent},
  { path: 'create-salary/:id', component: EmployeSalaryAddComponent},
  { path: 'detail-salary/:id', component: EmployeSalaryDetailComponent},
  // { path: 'tickets-buy/:id', component: TicketFormComponent},
  // { path: "person/:personal_number", component: PersionDetailComponent },
  { path: '', redirectTo: '/employes', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
