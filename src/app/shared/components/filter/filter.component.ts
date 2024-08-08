import { Component, inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeSalaryService } from 'src/app/employes/employe-salary/employe-salary.service';
import { EmployeService } from 'src/app/employes/employe/employe.service';
import { EmployeCBFilter } from 'src/app/employes/employe/types/employe.types';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  employeService: EmployeService = inject(EmployeService);
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  sharedService: SharedService = inject(SharedService);
  currentPage: number = 1;

  @Input({required: true}) filterParams: EmployeCBFilter[] = [];
  @Input({required: true}) currentSubject!: BehaviorSubject<EmployeCBFilter>;
  @Input({required: true}) queryParamsSubject!: BehaviorSubject<any>;
  @Input({required: true}) searchSubject!: BehaviorSubject<string>;

  onChangeInput(changeInput: EmployeCBFilter): void {
    const employeFilterDto = { ...this.queryParamsSubject.value.employeFilterDto };
    const changeSearch = this.searchSubject.value;
    let sortBy: string = '';
    
    if(changeInput.name === 'changeDateTime') {
      this.sharedService.witchType.next('date');
      this.searchSubject.next('');
    } else if(changeInput.name === 'calculationMonth') {
      this.sharedService.witchType.next('month');
      this.searchSubject.next('');
    } else {
      this.sharedService.witchType.next('text');
    }

    if(this.sharedService.isChange.value == true) {
      this.searchSubject.next('');
    }
    
    this.filterParams.forEach((params) => {
      if (params.name === changeInput.name) {
        params.chacked = !params.chacked;
        if (params.chacked) {
          sortBy = params.name;
          employeFilterDto[params.name] = this.searchSubject.value;
          this.currentSubject.next(params);
        } 
        else {
          delete employeFilterDto[params.name];
        }
      } 
      else {
        params.chacked = false;
        delete employeFilterDto[params.name];
      }
    });

    if(this.queryParamsSubject.value.pageNumber > 1) {
      this.currentPage = this.queryParamsSubject.value.pageNumber;
    }

    if(changeSearch == "") {
      this.queryParamsSubject.next({
        ...this.queryParamsSubject.value,
        employeFilterDto: employeFilterDto,
        sortBy: sortBy,
        pageNumber: this.currentPage
        
      });
    } else {
      this.queryParamsSubject.next({
        ...this.queryParamsSubject.value,
        employeFilterDto: employeFilterDto,
        sortBy: sortBy,
        pageNumber: 1
      });
    }
  }
}
