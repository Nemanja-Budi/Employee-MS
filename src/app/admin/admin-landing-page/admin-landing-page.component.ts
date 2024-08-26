import { Component, ElementRef, inject } from '@angular/core';
import { AdminService } from '../admin.service';
import { Links } from 'src/app/shared/types/shared.types';
import { getEmployesRoutes, getMPRoutes } from 'src/app/employes/types/employes.type';
import { getAdminRoutes } from '../types/admin.types';

@Component({
  selector: 'app-admin-landing-page',
  templateUrl: './admin-landing-page.component.html',
  styleUrls: ['./admin-landing-page.component.css']
})
export class AdminLandingPageComponent {

  adminService: AdminService = inject(AdminService);

  allRoutes: Links[] = [ ...getAdminRoutes(), ...getEmployesRoutes(), ...getMPRoutes()];
  // adminLinks: Links[] = getAdminRoutes();
  // employeLinks: Links[] = getEmployesRoutes();
  // mpLinks: Links[] = getMPRoutes();
}
