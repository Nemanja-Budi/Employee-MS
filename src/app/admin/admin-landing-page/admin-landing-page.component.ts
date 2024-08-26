import { Component, ElementRef, inject } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-landing-page',
  templateUrl: './admin-landing-page.component.html',
  styleUrls: ['./admin-landing-page.component.css']
})
export class AdminLandingPageComponent {

  adminService: AdminService = inject(AdminService);

  isOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.adminService.isOpen.next(this.isOpen);
  }

}
