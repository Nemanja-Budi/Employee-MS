import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KalkulacijeComponent } from './kalkulacije.component';

const routes: Routes = [
    { path: '', redirectTo: 'all-kalkulacije', pathMatch: 'full' },
    { path: 'all-kalkulacije', component: KalkulacijeComponent },
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
export class KalkulacijeRoutingModule { }
