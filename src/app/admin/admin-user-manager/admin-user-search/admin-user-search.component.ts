import { Component, inject } from '@angular/core';

import { AdminService } from '../../admin.service';

export type MemberSelect = {
  searchTerm: string;
  searchValue: string;
}

@Component({
  selector: 'app-admin-user-search',
  templateUrl: './admin-user-search.component.html',
  styleUrls: ['./admin-user-search.component.css']
})
export class AdminUserSearchComponent {

  adminService: AdminService = inject(AdminService);

  placeHolderValue: string = 'firstname'
  selectValues: MemberSelect[] = [
    {searchTerm: "First name", searchValue: "firstname" },
    {searchTerm: "Last name", searchValue: "lastname" },
    {searchTerm: "User name", searchValue: "username" }
  ];

  onGetSearchMemberInput(searchMemberInput: string): void {
    this.adminService.memberQuearyParamsSubject.next({
      ...this.adminService.memberQuearyParamsSubject.value,
      filterQuery: searchMemberInput,
      pageNumber: 1
    });
  }

  onGetMemberSelect(memberSelect: string): void {
    this.placeHolderValue = memberSelect;
    this.adminService.memberQuearyParamsSubject.next({
      ...this.adminService.memberQuearyParamsSubject.value,
      filterOn: memberSelect,
      sortBy: memberSelect,
      pageNumber: 1
    });
  }
  
  
}
