import { Component, inject, OnDestroy } from '@angular/core';
import { EmployeService } from './employe.service';
import { Employe } from 'src/app/models/employe/employe.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnDestroy {
  // itemsPerPage: number[] = [5,10,15];

  employeService: EmployeService = inject(EmployeService);
  employes: Observable<Employe[]> = this.employeService.getEmployes().pipe(map((employes) => employes.employes));
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

  ngOnDestroy(): void {
    console.log("Unistavam se");
    this.employeService.resetFilters();
  }
}
