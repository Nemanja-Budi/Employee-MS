import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment.development.ts';

import { Employe } from '../../models/employe/employe.model';
import { getDefaultEmployeFilter, GetEmploye, getEmployeCheckBoxes, GetEmployeParams } from './types/employe.types';
import { EmployeList } from '../../models/employe/employe.list.model';
import { CheckBoxFilter, CommonFilter, getDefaultCheckBoxFilter, getDefaultCommonFilter } from 'src/app/shared/types/shared.types';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  defaultEmployeFilter: GetEmployeParams = getDefaultEmployeFilter();
  employeCheckBoxes: CheckBoxFilter[] = getEmployeCheckBoxes();
  checkBoxSubject: CheckBoxFilter = getDefaultCheckBoxFilter();
  defaultCommonFilter: CommonFilter = getDefaultCommonFilter('firstName', 8);

  employeFilterSubject: GetEmploye = {
    employeFilterDto: this.defaultEmployeFilter,
    commonFilter: this.defaultCommonFilter
  }

  employeQuearyParamsSubject: BehaviorSubject<GetEmploye> = new BehaviorSubject<GetEmploye>(this.employeFilterSubject);
  employeCurrentSubject: BehaviorSubject<CheckBoxFilter> = new BehaviorSubject<CheckBoxFilter>(this.checkBoxSubject);
  employeSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  employeSubject: BehaviorSubject<Employe | null> = new BehaviorSubject<Employe | null>(null);
  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getEmployes(): Observable<EmployeList> {
    return this.employeQuearyParamsSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        const allFilters = { ...params.employeFilterDto, ...params.commonFilter };
        const { isAscending } = params.commonFilter;

        Object.keys(allFilters).forEach(key => {
          const value = allFilters[key];
          if (key !== 'isAscending' && value) {
            httpParams = httpParams.append(key, value);
          }
        });

        if (isAscending !== undefined && isAscending!== null) {
          httpParams = httpParams.append('isAscending', isAscending.toString());
        }
        
        return this.http.get<EmployeList>(`${environment.appUrl}/employe/get-employes`, { params: httpParams }).pipe(map((employelist) => {
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

  getEmployesForSelect(): Observable<Employe[]> {
    return this.http.get<EmployeList>(`${environment.appUrl}/employe/get-employes`).pipe(map((employe) => employe.employes));
  }

  addEmploye(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(`http://localhost:5000/api/employe/create-employe`, employe);
  }

  deleteEmploye(employeId: string): Observable<Employe> {
    return this.http.delete<Employe>(`http://localhost:5000/api/employe/delete-employe/${employeId}`);
  }

  getEmploye(employeId: string): Observable<Employe> {
    return this.http.get<Employe>(`http://localhost:5000/api/employe/get-employe/${employeId}`);
  }

  updateEmploye(employeId: string, employe: Employe): Observable<Employe> {
    return this. http.put<Employe>(`http://localhost:5000/api/employe/update-employe/${employeId}`, employe);
  }

  getEmployeCheckBoxes(): CheckBoxFilter[] {
    return this.employeCheckBoxes.slice();
  }

  openModal(employe: Employe): void {
    this.employeSubject.next(employe);
  }

  resetFilters(): void {
    this.employeCheckBoxes.forEach((employe) => {
      if(employe.name == "firstName") {
        employe.chacked = true;
      }
      else {
        employe.chacked = false;
      }
    });
    this.employeSearchSubject.next('');
    this.employeCurrentSubject.next(this.checkBoxSubject);
    this.employeQuearyParamsSubject.next({
      employeFilterDto: this.defaultEmployeFilter,
      commonFilter: this.defaultCommonFilter
    });
  }
}
