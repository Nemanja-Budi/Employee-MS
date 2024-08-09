import { Component, inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EmployeSalaryService } from 'src/app/employes/employe-salary/employe-salary.service';
import { EmployeService } from 'src/app/employes/employe/employe.service';
import { SharedService } from '../../shared.service';

import { CheckBoxFilter } from '../../types/shared.types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  employeService: EmployeService = inject(EmployeService);
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  sharedService: SharedService = inject(SharedService);

  @Input({required: true}) filterParams: CheckBoxFilter[] = [];
  @Input({required: true}) currentSubject!: BehaviorSubject<CheckBoxFilter>;
  @Input({required: true}) queryParamsSubject!: BehaviorSubject<any>;
  @Input({required: true}) searchSubject!: BehaviorSubject<string>;
  
  currentPage: number = 1;
  
  onChangeSearch(changeSearch: string): void {
    this.searchSubject.next(changeSearch);
    
    const currentEmploye = this.currentSubject.value;
    const employeFilterDto = { ...this.queryParamsSubject.value.employeFilterDto };
    const commonFilter = { ...this.queryParamsSubject.value.commonFilter }
    const employeParams = { ...this.filterParams };
    
    if(currentEmploye.name == '') {
      employeFilterDto[employeParams[0].name] = changeSearch;
    } else {
      employeFilterDto[currentEmploye.name] = changeSearch;
    }

    if(this.queryParamsSubject.value.commonFilter.pageNumber > 1) {
      this.currentPage = this.queryParamsSubject.value.commonFilter.pageNumber;
    }
    
    if(changeSearch == "") {
      this.queryParamsSubject.next({
        ...this.queryParamsSubject.value,
        employeFilterDto: employeFilterDto,
        commonFilter: {
          ...commonFilter,
          pageNumber: this.currentPage
        }
      });
      console.log(this.currentPage)
    } else {
      this.queryParamsSubject.next({
        ...this.queryParamsSubject.value,
        employeFilterDto: employeFilterDto,
        commonFilter: {
          ...commonFilter,
          pageNumber: 1 
        }
      });
    }
  }

}
