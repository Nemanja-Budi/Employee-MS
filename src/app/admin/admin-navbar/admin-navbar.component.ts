import { Component, inject, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from '../admin.service';
import { Links } from 'src/app/shared/types/shared.types';
import { getAdminRoutes } from '../types/admin.types';
import { getEmployesRoutes, getMPRoutes } from 'src/app/employes/types/employes.type';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnDestroy {
  
  accountService: AccountService = inject(AccountService);
  adminService: AdminService = inject(AdminService);

  adminLinks: Links[] = getAdminRoutes();
  employeLinks: Links[] = getEmployesRoutes();
  mpLinks: Links[] = getMPRoutes();

  logout(): void {
    this.accountService.logout();
  }

  ngOnDestroy(): void {
    this.adminService.isOpen.next(false); 
  }
}
