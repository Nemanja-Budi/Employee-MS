import { Component, inject } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-user-manager',
  templateUrl: './admin-user-manager.component.html',
  styleUrls: ['./admin-user-manager.component.css']
})
export class AdminUserManagerComponent {

  adminService: AdminService = inject(AdminService);
}
