import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrijemniceComponent } from './prijemnice.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-prijemnice', pathMatch: 'full' },
  { path: 'all-prijemnice', component: PrijemniceComponent },
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
export class PrijemniceRoutingModule { }
