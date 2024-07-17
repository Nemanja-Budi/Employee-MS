import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment.development.ts';

import { AuditLog } from '../../models/auditlog.model';
import { Employe } from '../../models/employe/employe.model';
import { GetEmploye, EmployeCBFilter } from './types/employe.types';
import { EmployeList } from '../../models/employe/employe.list.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  employeFilterSubject: GetEmploye = {
    employeFilterDto: {
      firstName: '',
      lastName: '',
      jmbg: '',
      identityCardNumber: '',
      phone: '',
      address: '',
      email: '',
      pio: 0,
      position: '',
      employmentContract: '',
      amendmentContract: '',
      bankName: '',
      currentAccount: 0
    },
    sortBy: '',
    isAscending: false,
    pageNumber: 0,
    pageSize: 0
  }

  cbSubject: EmployeCBFilter = {
    name: '', 
    chacked: false
  }

  employeParams: EmployeCBFilter[] = [
    { name: 'firstName', chacked: true },
    { name: 'lastName', chacked: false },
    { name: 'jmbg', chacked: false },
    { name: 'identityCardNumber', chacked: false },
    { name: 'phone', chacked: false },
    { name: 'address', chacked: false },
    { name: 'email', chacked: false },
    { name: 'pio', chacked: false },
    { name: 'position', chacked: false },
    { name: 'employmentContract', chacked: false },
    { name: 'amendmentContract', chacked: false },
    { name: 'bankName', chacked: false },
    { name: 'currentAccount', chacked: false },
  ];

  employeQuearyParamsSubject: BehaviorSubject<GetEmploye> = new BehaviorSubject<GetEmploye>(this.employeFilterSubject);
  employeSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  employeCurrentSubject: BehaviorSubject<EmployeCBFilter> = new BehaviorSubject<EmployeCBFilter>(this.cbSubject);

  constructor(private http: HttpClient ) { }

  getEmployes(): Observable<EmployeList> {
    return this.employeQuearyParamsSubject.pipe(
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
        return this.http.get<EmployeList>(`${environment.appUrl}/employe/get-employes`, { params: httpParams });
      })
    );
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

  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`http://localhost:5000/api/auditlogs/get-auditlogs`);
  }

  getEmployeParams(): EmployeCBFilter[] {
    return this.employeParams.slice();
  }

  resetFilters(): void {
    this.employeParams.forEach((employe) => {
      if(employe.name == "firstName") {
        employe.chacked = true;
      }
      else {
        employe.chacked = false;
      }
    });

    this.employeSearchSubject.next('');
    this.employeQuearyParamsSubject.next({
      employeFilterDto: {
        firstName: '',
        lastName: '',
        jmbg: '',
        identityCardNumber: '',
        phone: '',
        address: '',
        email: '',
        pio: 0,
        position: '',
        employmentContract: '',
        amendmentContract: '',
        bankName: '',
        currentAccount: 0
      },
      sortBy: '',
      isAscending: false,
      pageNumber: 0,
      pageSize: 50
    });
  }
}