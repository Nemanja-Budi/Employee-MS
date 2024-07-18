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
  currentPage: number = 1;
  
  onChangeSearch(changeSearch: string): void {
    this.employeService.employeSearchSubject.next(changeSearch);
    const currentEmploye = this.employeService.employeCurrentSubject.value;
    const employeFilterDto = { ...this.employeService.employeQuearyParamsSubject.value.employeFilterDto };
  
    if(currentEmploye.name == '') {
      employeFilterDto[this.employeParams[0].name] = changeSearch;
    } else {
      employeFilterDto[currentEmploye.name] = changeSearch;
    }

    if(this.employeService.employeQuearyParamsSubject.value.pageNumber > 1) {
      this.currentPage = this.employeService.employeQuearyParamsSubject.value.pageNumber;
    }
    
    if(changeSearch == "") {
      this.employeService.employeQuearyParamsSubject.next({
        ...this.employeService.employeQuearyParamsSubject.value,
        employeFilterDto: employeFilterDto,
        pageNumber: this.currentPage
      });
      console.log(this.currentPage)
    } else {
      this.employeService.employeQuearyParamsSubject.next({
        ...this.employeService.employeQuearyParamsSubject.value,
        employeFilterDto: employeFilterDto,
        pageNumber: 1
      });
    }
  }

  ngOnDestroy(): void {
    console.log("Unistavam se");
    this.employeService.resetFilters();
  }
}
