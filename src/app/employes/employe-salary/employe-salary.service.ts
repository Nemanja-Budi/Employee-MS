import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment.development.ts';

import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { Employe } from 'src/app/models/employe/employe.model';
import { BankAccount, CustomBank, getBankAccounts, getDefaultEmployeSalaryFilter, GetEmployeSalary, getEmployeSalaryCheckBoxes, GetEmployeSalaryParams } from './types/employe.salary.types';
import { EmployeSalaryList } from 'src/app/models/employe-salary/employe.salary.list.model';
import { SharedService } from 'src/app/shared/shared.service';
import { CheckBoxFilter, CommonFilter, getDefaultCheckBoxFilter, getDefaultCommonFilter } from 'src/app/shared/types/shared.types';

@Injectable({
  providedIn: 'root'
})
export class EmployeSalaryService {

  defaultEmployeSalaryFilter: GetEmployeSalaryParams = getDefaultEmployeSalaryFilter();
  checkBoxSubject: CheckBoxFilter = getDefaultCheckBoxFilter();
  defaultCommonFilter: CommonFilter = getDefaultCommonFilter('firstName', 15);
  employeSalaryCheckBox: CheckBoxFilter[] = getEmployeSalaryCheckBoxes();
  bankAccounts: BankAccount[] = getBankAccounts();
  
  employeSalaryFilterSubject: GetEmployeSalary = {
    employeFilterDto: this.defaultEmployeSalaryFilter,
    commonFilter: this.defaultCommonFilter
  }
  
  employeSalaryQuearyParamsSubject: BehaviorSubject<GetEmployeSalary> = new BehaviorSubject<GetEmployeSalary>(this.employeSalaryFilterSubject);
  employeSalaryCurrentSubject: BehaviorSubject<CheckBoxFilter> = new BehaviorSubject<CheckBoxFilter>(this.checkBoxSubject);
  employeSalarySearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  employeSubject: BehaviorSubject<Employe | null> = new BehaviorSubject<Employe | null>(null);
  isModalOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private sharedService: SharedService) { }
  
  getEmployeSalarys(): Observable<EmployeSalaryList> {
    return this.employeSalaryQuearyParamsSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        const allFilters = { ...params.employeFilterDto, ...params.commonFilter };
        const { isAscending } = params.commonFilter;
        
        Object.keys(allFilters).forEach(key => {
          if (allFilters[key] && key !== 'isAscending') {
            if (key === 'changeDateTime') {
              const formattedDate = this.sharedService.formatDate(allFilters[key]);
              httpParams = httpParams.append(key, formattedDate);
            } else {
              httpParams = httpParams.append(key, allFilters[key]);
            }
          }
        });

        if (isAscending !== undefined && isAscending!== null) {
          httpParams = httpParams.append('isAscending', isAscending.toString());
        }
        
        return this.http.get<EmployeSalaryList>(`${environment.appUrl}/employesalary/employe-salarys`, { params: httpParams }).pipe(map((employelist) => {
          this.currentSize.next(Math.ceil(employelist.totalCount/params.commonFilter.pageSize));
          if(employelist.totalCount == 0) {
            this.isNula.next(true);
          } else {
            this.isNula.next(false);
          }
          return employelist;
        }));
      })
    );
  }

  getSalariesByBank(month: number, year: number): Observable<CustomBank[]> {
    return this.http.get<CustomBank[]>(`http://localhost:5000/api/employeSalary/salaries-by-bank?month=${month}&year=${year}`);
  }

  getTotalSalariesByBanks(month: number, year: number): Observable<number> {
    return this.http.get<number>(`http://localhost:5000/api/employesalary/grand-total-salary?month=${month}&year=${year}`);
  }

  getEmployeSalarysByEmployeId(employeId: string): Observable<EmployeSalary[]> {
    return this.http.get<EmployeSalary[]>(`http://localhost:5000/api/employesalary/employe-salarys/${employeId}`);
  }

  createEmployeSalary(employeSalary: EmployeSalary): Observable<EmployeSalary> {
    return this.http.post<EmployeSalary>(`http://localhost:5000/api/employesalary/create-employe-salary`, employeSalary);
  }

  getEmployeSalaryById(employeSalaryId: string): Observable<EmployeSalary> {
    return this.http.get<EmployeSalary>(`http://localhost:5000/api/employesalary/employe-salary/${employeSalaryId}`);
  }

  updateEmployeSalary(employeSalary: EmployeSalary): Observable<EmployeSalary> {
    return this.http.put<EmployeSalary>(`http://localhost:5000/api/employesalary/update-employe-salary`, employeSalary);
  }

  deleteEmployeSalary(employeSalaryId: string): Observable<string> {
    return this.http.delete<string>(`http://localhost:5000/api/employesalary/delete-employe-salary/${employeSalaryId}`);
  }

  getEmployeSalaryCheckBox(): CheckBoxFilter[] {
    return this.employeSalaryCheckBox.slice();
  }

  getBankAccounts(): BankAccount[] {
    return this.bankAccounts.slice();
  }

  resetFilters(): void {
    this.employeSalaryCheckBox.forEach((employeSalary) => {
      if(employeSalary.name == "firstName") {
        employeSalary.chacked = true;
      }
      else {
        employeSalary.chacked = false;
      }
    });
    this.sharedService.isChange.next(false);
    this.sharedService.witchType.next('text');
    this.employeSalarySearchSubject.next('');
    this.employeSalaryCurrentSubject.next(this.checkBoxSubject);
    this.employeSalaryQuearyParamsSubject.next({
      employeFilterDto: this.defaultEmployeSalaryFilter,
      commonFilter: this.defaultCommonFilter
    });
  }
}
