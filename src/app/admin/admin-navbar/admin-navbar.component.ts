import { Component, inject, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { AdminService } from '../admin.service';
import { Links } from 'src/app/shared/types/shared.types';
import { getAdminRoutes } from '../types/admin.types';
import { getEmployesRoutes } from 'src/app/employes/types/employes.type';
import { Router } from '@angular/router';
import { getMPRoutes } from 'src/app/mp/types/mp.type';


@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnDestroy {
  
  accountService: AccountService = inject(AccountService);
  adminService: AdminService = inject(AdminService);
  router: Router = inject(Router);

  allLinks: Links[] = [ ...getAdminRoutes(), ...getEmployesRoutes(), ...getMPRoutes() ];

   getFilteredLinks() {
    if (this.adminService.isOpen.value) {
      return this.allLinks;
    } else {
      return this.allLinks.filter(link =>
        link.linkRoute === 'admin/dashboard' || 
        this.router.url.includes(link.linkRoute) || 
        link.linkRoute.includes('employes') || 
        link.linkRoute.includes('#')
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
