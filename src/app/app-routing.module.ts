import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeComponent } from './employes/employe/employe.component';
import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';

const routes: Routes = [
  // { path: 'employes', component: EmployeComponent },
  // { path: 'employe-add', component: EmployeAddComponent},
  // { path: 'employe-edit/:id', component: EmployeAddComponent},
  // { path: 'employe-detail/:id', component: EmployeDetailComponent},
  // { path: 'salarys', component: EmployeSalaryComponent },
  // { path: 'create-salary', component: EmployeSalaryAddComponent},
  // { path: 'create-salary/:id', component: EmployeSalaryAddComponent},
  // { path: 'detail-salary/:id', component: EmployeSalaryDetailComponent},
  { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule), canActivate: [AuthorizationGuard] },
  { path: 'employes', loadChildren: () => import('./employes/employe.module').then(module => module.EmployeModule) },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: '**', component: LandingPageComponent, redirectTo: '' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
