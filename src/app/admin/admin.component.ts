import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  adminService: AdminService = inject(AdminService);

  isOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.adminService.isOpen.next(this.isOpen);
  }

 

  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent): void {
  //   const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
  //   if (!clickedInside && this.isOpen) {
  //     this.isOpen = false;
  //   }
  // }


}
