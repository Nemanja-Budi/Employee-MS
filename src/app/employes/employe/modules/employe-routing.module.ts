import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeAddComponent } from '../employe-add/employe-add.component';
import { EmployeDetailComponent } from '../employe-detail/employe-detail.component';
import { EmployeComponent } from '../employe.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-employes', pathMatch: 'full' },
  { path: 'all-employes', component: EmployeComponent },
  { path: 'add-employe', component: EmployeAddComponent},
  { path: 'edit-employe/:id', component: EmployeAddComponent},
  { path: 'detail-employe/:id', component: EmployeDetailComponent},
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
export class EmployeRoutingModule { }
