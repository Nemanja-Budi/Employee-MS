import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { Employe } from 'src/app/models/employe/employe.model';
import { GetEmployeSalary } from './types/employe.salary.types';
import { EmployeSalaryList } from 'src/app/models/employe-salary/employe.salary.list.model';
import { environment } from 'src/environments/environment.development.ts';
import { EmployeCBFilter } from '../employe/types/employe.types';

export type CustomBank = {
  bankName: string;
  totalNetSalary: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeSalaryService {

  employeSalaryFilterSubject: GetEmployeSalary = {
    employeFilterDto: {
      firstName: '',
      lastName: '',
      bankName: ''
    },
    sortBy: 'firstName',
    isAscending: true,
    pageNumber: 1,
    pageSize: 15
  }

  cbSubject: EmployeCBFilter = {
    showName: '',
    name: '', 
    chacked: false
  }

  employeSalaryParams: EmployeCBFilter[] = [
    { showName: 'Ime', name: 'firstName', chacked: true },
    { showName: 'Prezime', name: 'lastName', chacked: false },
    { showName: 'Banka', name: 'bankName', chacked: false },
  ];

  employeSubject: BehaviorSubject<Employe | null> = new BehaviorSubject<Employe | null>(null);
  employeSalaryQuearyParamsSubject: BehaviorSubject<GetEmployeSalary> = new BehaviorSubject<GetEmployeSalary>(this.employeSalaryFilterSubject);

  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  employeSalarySearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  employeSalaryCurrentSubject: BehaviorSubject<EmployeCBFilter> = new BehaviorSubject<EmployeCBFilter>(this.cbSubject);

  isModalOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  bankData: BehaviorSubject<CustomBank[]> = new BehaviorSubject<CustomBank[]>([]);
  constructor(private http: HttpClient) { }

  getSalariesByBank(mesec: number, year: number): Observable<CustomBank[]> {
    return this.http.get<CustomBank[]>(`http://localhost:5000/api/employeSalary/salaries-by-bank?month=${mesec}&year=${year}`).pipe(map((b) => {
      this.bankData.next(b);
      return b;
    }));
  }


  getEmployeSalaryParams(): EmployeCBFilter[] {
    return this.employeSalaryParams.slice();
  }

  getEmployeSalarys(): Observable<EmployeSalaryList> {
    return this.employeSalaryQuearyParamsSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        const filterDto = params.employeFilterDto;
        Object.keys(filterDto).forEach(key => {
          if (filterDto[key]) {
            httpParams = httpParams.append(key, filterDto[key]);
          }
        });
        if (params.sortBy) httpParams = httpParams.append('sortBy', params.sortBy);
        if (params.isAscending !== undefined) httpParams = httpParams.append('isAscending', params.isAscending.toString());
        if (params.pageNumber) httpParams = httpParams.append('pageNumber', params.pageNumber);
        if (params.pageSize) httpParams = httpParams.append('pageSize', params.pageSize);
        else httpParams = httpParams.append('pageSize', '50');
        return this.http.get<EmployeSalaryList>(`${environment.appUrl}/employesalary/employe-salarys`, { params: httpParams }).pipe(map((employelist) => {
          this.currentSize.next(Math.ceil(employelist.totalCount/params.pageSize));
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

 
  resetFilters(): void {
    this.employeSalaryParams.forEach((employe) => {
      if(employe.name == "firstName") {
        employe.chacked = true;
      }
      else {
        employe.chacked = false;
      }
    });

    this.employeSalarySearchSubject.next('');
    this.employeSalaryQuearyParamsSubject.next({
      employeFilterDto: {
        firstName: '',
        lastName: '',
        bankName: ''
      },
      sortBy: 'firstName',
      isAscending: true,
      pageNumber: 1,
      pageSize: 15
    });
  }
}
