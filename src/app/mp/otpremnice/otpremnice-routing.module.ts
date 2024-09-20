import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpremniceComponent } from './otpremnice.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-otpremnice', pathMatch: 'full' },
  { path: 'all-otpremnice', component: OtpremniceComponent },
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
export class OtpremniceRoutingModule { }
