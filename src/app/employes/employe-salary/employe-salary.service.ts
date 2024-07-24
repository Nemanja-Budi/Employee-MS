import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { Employe } from 'src/app/models/employe/employe.model';
import { GetEmployeSalary } from './types/employe.salary.types';
import { EmployeSalaryList } from 'src/app/models/employe-salary/employe.salary.list.model';
import { environment } from 'src/environments/environment.development.ts';

@Injectable({
  providedIn: 'root'
})
export class EmployeSalaryService {

  employeSalaryFilterSubject: GetEmployeSalary = {
    employeSalaryFilterDto: {
      firstName: '',
      lastName: '',
    },
    sortBy: 'firstName',
    isAscending: true,
    pageNumber: 1,
    pageSize: 12
  }

  employeSubject: BehaviorSubject<Employe | null> = new BehaviorSubject<Employe | null>(null);
  employeSalaryQuearyParamsSubject: BehaviorSubject<GetEmployeSalary> = new BehaviorSubject<GetEmployeSalary>(this.employeSalaryFilterSubject);

  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getEmployeSalarys(): Observable<EmployeSalaryList> {
    return this.employeSalaryQuearyParamsSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        const filterDto = params.employeSalaryFilterDto;
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

  private apiUrl = 'http://localhost:5000/api/pdf/generate'; // URL vašeg API endpoint-a

  generatePdf(htmlContent: string): Observable<Blob> {
    return this.http.post(this.apiUrl, { HtmlContent: htmlContent }, { responseType: 'blob' });
  }
}
