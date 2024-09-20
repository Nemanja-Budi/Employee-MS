import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacuniComponent } from './racuni.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-racuni', pathMatch: 'full' },
  { path: 'all-racuni', component: RacuniComponent },
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
export class RacuniRoutingModule { }
