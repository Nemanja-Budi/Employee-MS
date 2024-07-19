import { Component, inject } from '@angular/core';
import { EmployeService } from './employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent {
  itemsPerPage: number[] = [5,10,15];

  employeService: EmployeService = inject(EmployeService);

  onChangeItemPerPage(item: number): void {
    // if(!this.isUser) {
    //   this.adminService.memberQuearyParamsSubject.next({
    //     ...this.adminService.memberQuearyParamsSubject.value,
    //     pageNumber: 1,
    //     pageSize: item
    //   });
    // } else {
    //   console.log("Dodaj nesto")
    // }
  }
}
