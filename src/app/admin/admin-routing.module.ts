import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserManagerComponent } from './admin-user-manager/admin-user-manager.component';
import { AdminComponent } from './admin.component';
import { AdminEditMemberComponent } from './admin-user-manager/admin-edit-member/admin-edit-member.component';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  { path: '', component: AdminComponent},
  { path: 'user-manager', component: AdminUserManagerComponent, canActivate: [AdminGuard] },
  { path: 'add-new-user', component: AdminEditMemberComponent, canActivate: [AdminGuard]},
  { path: 'edit-user/:id', component: AdminEditMemberComponent, canActivate: [AdminGuard]},
  // { path: 'contact-manager', component: AdminContactManagerComponent },
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
export class AdminRoutingModule { }
