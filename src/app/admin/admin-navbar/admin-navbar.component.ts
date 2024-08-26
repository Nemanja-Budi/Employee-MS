import { Component, inject, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from '../admin.service';
import { Links } from 'src/app/shared/types/shared.types';
import { getAdminRoutes } from '../types/admin.types';
import { getEmployesRoutes, getMPRoutes } from 'src/app/employes/types/employes.type';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnDestroy {
  
  accountService: AccountService = inject(AccountService);
  adminService: AdminService = inject(AdminService);
  router: Router = inject(Router);

  adminLinks: Links[] = getAdminRoutes();
  employeLinks: Links[] = getEmployesRoutes();
  mpLinks: Links[] = getMPRoutes();

   getFilteredLinks() {
    if (this.adminService.isOpen.value) {
      return this.adminLinks;
    } else {
      return this.adminLinks.filter(link =>
        link.linkRoute === 'admin/dashboard' || this.router.url.includes(link.linkRoute)
      );
    }
  }

  logout(): void {
    this.accountService.logout();
  }

  close(): void {
    this.adminService.isOpen.next(false);
  }

  ngOnDestroy(): void {
    this.adminService.isOpen.next(false); 
  }
}
