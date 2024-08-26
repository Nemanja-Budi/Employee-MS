import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserManagerComponent } from './admin-user-manager/admin-user-manager.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AccountModule } from '../account/account.module';
import { SharedModule } from "../shared/shared.module";

import { AdminComponent } from './admin.component';
import { AdminEditMemberComponent } from './admin-user-manager/admin-edit-member/admin-edit-member.component';
import { AdminUserTableComponent } from './admin-user-manager/admin-user-table/admin-user-table.component';
import { AuditlogsComponent } from './auditlogs/auditlogs.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminLandingPageComponent } from './admin-landing-page/admin-landing-page.component';


@NgModule({
    declarations: [
        AdminComponent,
        AdminUserManagerComponent,
        AdminEditMemberComponent,
        AdminUserTableComponent,
        AuditlogsComponent,
        AdminNavbarComponent,
        AdminLandingPageComponent,
    ],
    exports: [AdminNavbarComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        AccountModule,
        SharedModule
    ]
})
export class AdminModule { }
