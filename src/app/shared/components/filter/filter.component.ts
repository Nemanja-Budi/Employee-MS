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

  @Input({required: true}) employeParams: EmployeCBFilter[] = [];
  @Input({required: true}) queryParamsSubject!: BehaviorSubject<any>;
  @Input({required: true}) searchSubject!: BehaviorSubject<string>;

  onChangeInput(changeInput: EmployeCBFilter): void {
    const employeFilterDto = { ...this.queryParamsSubject.value.employeFilterDto };
    let sortBy: string = '';
    let changeSearch = this.searchSubject.value;
    if(changeInput.name === 'changeDateTime') {
      this.sharedService.isDate.next(true);
      // this.sharedService.isChange.next(true);
      this.sharedService.witchType.next('date');
      this.searchSubject.next('');
    } else {
      this.sharedService.witchType.next('text');
      this.sharedService.isDate.next(false);
    
      // this.sharedService.isChange.next(false);
      // this.searchSubject.next('');
    }

    console.log(this.sharedService.isChange.value);

    if(this.sharedService.isChange.value == true) {
      this.searchSubject.next('');
      // this.sharedService.isChange.next(false);
    }
    
    this.employeParams.forEach((employe) => {
      if (employe.name === changeInput.name) {
        employe.chacked = !employe.chacked;
        if (employe.chacked) {
          sortBy = employe.name;
          employeFilterDto[employe.name] = this.searchSubject.value;
          this.employeService.employeCurrentSubject.next(employe);
        } 
        else {
          console.log("Ulazim u else");
          delete employeFilterDto[employe.name];
        }
      } 
      else {
        employe.chacked = false;
        delete employeFilterDto[employe.name];
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
      // console.log(this.currentPage)
    } else {
      this.queryParamsSubject.next({
        ...this.queryParamsSubject.value,
        employeFilterDto: employeFilterDto,
        sortBy: sortBy,
        pageNumber: 1
      });
    }
  }

  ngOnDestroy(): void {
    console.log("Unistavam se");
    this.employeService.resetFilters();
    this.employeSalaryService.resetFilters();
  }
}
