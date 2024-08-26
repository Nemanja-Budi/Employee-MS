import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserManagerComponent } from './admin-user-manager/admin-user-manager.component';
import { AdminComponent } from './admin.component';
import { AdminEditMemberComponent } from './admin-user-manager/admin-edit-member/admin-edit-member.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AuditlogsComponent } from './auditlogs/auditlogs.component';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AdminComponent, // Komponenta koja sadrži poseban `router-outlet`
    children: [
      { path: 'dashboard', component: AdminLandingPageComponent },
      { path: 'users', component: AdminUserManagerComponent },
      { path: 'add-new-user', component: AdminEditMemberComponent },
      { path: 'edit-user/:id', component: AdminEditMemberComponent },
      { path: 'audit-logs', component: AuditlogsComponent },
    ]
  }
  // { path: 'user-manager', component: AdminUserManagerComponent,  },
  // { path: 'add-new-user', component: AdminEditMemberComponent, },
  // { path: 'edit-user/:id', component: AdminEditMemberComponent, },
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
