import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { AdminGuard } from './shared/guards/admin.guard';

//PREGLEDANO OKE

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule), canActivate: [AdminGuard] },
  { path: 'banks', loadChildren: () => import('./banks/bank.module').then(module => module.BankModule) },
  { path: 'employes', loadChildren: () => import('./employes/employes.module').then(module => module.EmployesModule), canActivate: [AuthorizationGuard], canMatch: [AuthorizationGuard] },
  { path: 'mp', loadChildren: () => import('./mp/mp.module').then(module => module.MpModule) },
  { path: '', component: LandingPageComponent, pathMatch: 'full', canMatch: [AuthorizationGuard] },
  { path: '**', component: LandingPageComponent, redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
