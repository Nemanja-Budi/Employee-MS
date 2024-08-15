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

  currentPage: number = 1;

  @Input({required: true}) filterParams: CheckBoxFilter[] = [];
  @Input({required: true}) currentSubject!: BehaviorSubject<CheckBoxFilter>;
  @Input({required: true}) queryParamsSubject!: BehaviorSubject<any>;
  @Input({required: true}) searchSubject!: BehaviorSubject<string>;
  
  onChangeSearch(changeSearch: string): void {
    this.searchSubject.next(changeSearch);
    
    const currentSubject = this.currentSubject.value;
    const filterDto = { ...this.queryParamsSubject.value.employeFilterDto };
    const commonFilter = { ...this.queryParamsSubject.value.commonFilter }
    const employeParams = { ...this.filterParams };
    
    if(currentSubject.name == '') {
      filterDto[employeParams[0].name] = changeSearch;
    } else {
      filterDto[currentSubject.name] = changeSearch;
    }

    if(this.queryParamsSubject.value.commonFilter.pageNumber > 1) {
      this.currentPage = this.queryParamsSubject.value.commonFilter.pageNumber;
    }
    
    this.queryParamsSubject.next({
      ...this.queryParamsSubject.value,
      employeFilterDto: filterDto,
      commonFilter: {
        ...commonFilter,
        pageNumber: changeSearch == "" ? this.currentPage : 1
      }
    });

  }
}
