import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MpComponent } from './mp.component';

const routes: Routes = [
  { path: '', redirectTo: 'otpremnice', pathMatch: 'full' },
  {
    path: '',
    component: MpComponent,
    children: [
      { path: 'otpremnice', loadChildren: () => import('./otpremnice/otpremnice.module').then(m => m.OtpremniceModule) },
      { path: 'kalkulacije', loadChildren: () => import('./kalkulacije/kalkulacije.module').then(m => m.KalkulacijeModule) },
      { path: 'racuni', loadChildren: () => import('./racuni/racuni.module').then(m => m.RacuniModule) },
      // { path: 'salary', loadChildren: () => import('./employe-salary/modules/employe.salary.module').then(m => m.EmployeSalaryModule) },
      // { path: 'annual-leave', loadChildren: () => import('./annual-leaves/annual-leave.module').then(m => m.AnnualLeaveModule) },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MpRoutingModule { }
