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
      { path: 'prijemnice', loadChildren: () => import('./prijemnice/prijemnice.module').then(m => m.PrijemniceModule) },
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
