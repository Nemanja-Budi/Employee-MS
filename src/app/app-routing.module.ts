import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './core/landing-page/landing-page.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';

const routes: Routes = [
  { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule), canActivate: [AuthorizationGuard] },
  { path: 'employes', loadChildren: () => import('./employes/employes.module').then(module => module.EmployesModule) },
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: '**', component: LandingPageComponent, redirectTo: '' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
