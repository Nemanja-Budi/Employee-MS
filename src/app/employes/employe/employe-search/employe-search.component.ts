import { Component, inject, OnDestroy } from '@angular/core';

import { EmployeCBFilter } from '../types/employe.types';
import { EmployeService } from 'src/app/employes/employe/employe.service';


@Component({
  selector: 'app-employe-search',
  templateUrl: './employe-search.component.html',
  styleUrls: ['./employe-search.component.css']
})
export class EmployeSearchComponent implements OnDestroy {
  employeService: EmployeService = inject(EmployeService);
  employeParams: EmployeCBFilter[] = this.employeService.getEmployeParams();
  isChange: string = '';
  onChangeSearch(changeSearch: string): void {
    this.employeService.employeSearchSubject.next(changeSearch);
    this.isChange = changeSearch;

    const currentEmploye = this.employeService.employeCurrentSubject.value;
    const employeFilterDto = { ...this.employeService.employeQuearyParamsSubject.value.employeFilterDto };
    let currentPage: number = 1;
  
    if(currentEmploye.name == '') {
      employeFilterDto[this.employeParams[0].name] = changeSearch;
    } else {
      employeFilterDto[currentEmploye.name] = changeSearch;
    }

    if(this.isChange != "") {
      currentPage = this.employeService.employeQuearyParamsSubject.value.pageNumber;
      console.log(currentPage);
    }
    this.employeService.employeQuearyParamsSubject.next({
      ...this.employeService.employeQuearyParamsSubject.value,
      employeFilterDto: employeFilterDto,
      pageNumber: currentPage
    });
  }

  ngOnDestroy(): void {
    console.log("Unistavam se");
    this.employeService.resetFilters();
  }
}
