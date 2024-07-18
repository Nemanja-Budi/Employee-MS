import { Component, inject, OnDestroy } from '@angular/core';

import { EmployeCBFilter } from '../types/employe.types';
import { EmployeService } from 'src/app/employes/employe/employe.service';


@Component({
  selector: 'app-employe-filter',
  templateUrl: './employe-filter.component.html',
  styleUrls: ['./employe-filter.component.css']
})
export class EmployeFilterComponent implements OnDestroy {

  employeService: EmployeService = inject(EmployeService);
  employeParams: EmployeCBFilter[] = this.employeService.getEmployeParams();
  currentPage: number = 1;

  onChangeInput(changeInput: EmployeCBFilter): void {
    const employeFilterDto = { ...this.employeService.employeQuearyParamsSubject.value.employeFilterDto };

    let changeSearch = this.employeService.employeSearchSubject.value;

    this.employeParams.forEach((employe) => {
      if (employe.name === changeInput.name) {
        employe.chacked = !employe.chacked;
        if (employe.chacked) {
          employeFilterDto[employe.name] = this.employeService.employeSearchSubject.value;
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
    // this.employeService.employeQuearyParamsSubject.next({
    //   ...this.employeService.employeQuearyParamsSubject.value,
    //   employeFilterDto: employeFilterDto,
    // });
  }

  ngOnDestroy(): void {
    console.log("Unistavam se");
    this.employeService.resetFilters();
  }
}
