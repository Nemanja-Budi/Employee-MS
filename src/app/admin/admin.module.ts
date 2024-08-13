import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserManagerComponent } from './admin-user-manager/admin-user-manager.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserHasRoleDirective } from '../shared/directives/user-has-role.directive';
import { AdminEditMemberComponent } from './admin-user-manager/admin-edit-member/admin-edit-member.component';
import { AccountModule } from '../account/account.module';
import { SharedModule } from "../shared/shared.module";
import { AdminUserTableComponent } from './admin-user-manager/admin-user-table/admin-user-table.component';
import { AuditlogsComponent } from './auditlogs/auditlogs.component';


@NgModule({
    declarations: [
        AdminComponent,
        AdminUserManagerComponent,
        UserHasRoleDirective,
        AdminEditMemberComponent,
        AdminUserTableComponent,
        AuditlogsComponent,
    ],
    exports: [UserHasRoleDirective],
    imports: [
        CommonModule,
        AdminRoutingModule,
        AccountModule,
        SharedModule
    ]
})
export class AdminModule { }
