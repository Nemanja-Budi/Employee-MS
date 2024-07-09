import { Component, Input, inject } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-show-items-per-page',
  templateUrl: './admin-show-items-per-page.component.html',
  styleUrls: ['./admin-show-items-per-page.component.css']
})
export class AdminShowItemsPerPageComponent {

  @Input() isUser: boolean = false;
  itemsPerPage: number[] = [5,10,15];

  adminService: AdminService = inject(AdminService);
  isAscending: boolean = this.adminService.memberQuearyParamsSubject.value.isAscending;

  onChangeSortDirection(): void {
    this.isAscending = !this.isAscending;
    this.adminService.memberQuearyParamsSubject.next({
      ...this.adminService.memberQuearyParamsSubject.value,
      isAscending: this.isAscending
    });
  }

  onChangeItemPerPage(item: number): void {
    if(!this.isUser) {
      this.adminService.memberQuearyParamsSubject.next({
        ...this.adminService.memberQuearyParamsSubject.value,
        pageNumber: 1,
        pageSize: item
      });
    } else {
      console.log("Dodaj nesto")
    }
  }

  showItemsPerPage(itemsPerPage: string): void {
    if(this.isUser) return;
    if(itemsPerPage == '') {
      this.adminService.memberQuearyParamsSubject.next({
        ...this.adminService.memberQuearyParamsSubject.value,
        pageNumber: 1,
        pageSize: this.itemsPerPage[1]
      });
    } else {
      this.adminService.memberQuearyParamsSubject.next({
        ...this.adminService.memberQuearyParamsSubject.value,
        pageNumber: 1,
        pageSize: Number(itemsPerPage)
      });
    }
  }
}
