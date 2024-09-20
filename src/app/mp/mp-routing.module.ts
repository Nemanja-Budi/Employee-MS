import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MpComponent } from './mp.component';

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component: MpComponent },
//   { path: 'register', component: RegisterComponent },
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
