import { Component, inject } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-user-paganation',
  templateUrl: './admin-user-paganation.component.html',
  styleUrls: ['./admin-user-paganation.component.css']
})
export class AdminUserPaganationComponent {

  adminService: AdminService = inject(AdminService);
  currentPage: number = this.adminService.memberQuearyParamsSubject.value.pageNumber;

  visiblePages(): number[] {
    const maxPagesToShow = 3;
    const startPage = Math.max(1, this.adminService.memberQuearyParamsSubject.value.pageNumber - 1);
    const endPage = Math.min(this.adminService.currentSizeMember.value, startPage + maxPagesToShow - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(this.currentPage);
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.updatePage(this.currentPage);
  }

  goToLastPage(): void {
    this.currentPage = this.adminService.currentSizeMember.value
    this.updatePage(this.currentPage);
  }

  goToPreviousPage(): void {
    if (this.adminService.memberQuearyParamsSubject.value.pageNumber > 1) {
      this.adminService.memberQuearyParamsSubject.value.pageNumber--;
      this.updatePage(this.adminService.memberQuearyParamsSubject.value.pageNumber);
    }
  }

  goToNextPage(): void {
    if (this.adminService.memberQuearyParamsSubject.value.pageNumber < this.adminService.currentSizeMember.value) {
      this.adminService.memberQuearyParamsSubject.value.pageNumber++;
      this.updatePage(this.adminService.memberQuearyParamsSubject.value.pageNumber);
    }
  }

  private updatePage(page: number) {
    return this.adminService.memberQuearyParamsSubject.next({
      ...this.adminService.memberQuearyParamsSubject.value,
      pageNumber: page
    });
  }
}
