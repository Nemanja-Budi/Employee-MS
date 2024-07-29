import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment.development.ts';

import { AuditLog } from '../../models/auditlog.model';
import { Employe } from '../../models/employe/employe.model';
import { GetEmploye, EmployeCBFilter } from './types/employe.types';
import { EmployeList } from '../../models/employe/employe.list.model';
import { EmployeModalComponent } from './employe-modal/employe-modal.component';

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
    sortBy: 'firstName',
    isAscending: true,
    pageNumber: 1,
    pageSize: 8
  }

  cbSubject: EmployeCBFilter = {
    showName: '',
    name: '', 
    chacked: false
  }

  employeParams: EmployeCBFilter[] = [
    { showName: 'Ime', name: 'firstName', chacked: true },
    { showName: 'Prezime', name: 'lastName', chacked: false },
    { showName: 'Jmbg', name: 'jmbg', chacked: false },
    { showName: 'Br. Lk', name: 'identityCardNumber', chacked: false },
    { showName: 'Telefon', name: 'phone', chacked: false },
    { showName: 'Adresa', name: 'address', chacked: false },
    { showName: 'Email', name: 'email', chacked: false },
    { showName: 'Pio', name: 'pio', chacked: false },
    { showName: 'Pozicija', name: 'position', chacked: false },
    { showName: 'Ugovor o radu', name: 'employmentContract', chacked: false },
    { showName: 'Aneks ugovora', name: 'amendmentContract', chacked: false },
    { showName: 'Banka', name: 'bankName', chacked: false },
    { showName: 'Bankovni racun', name: 'currentAccount', chacked: false },
  ];

  employeQuearyParamsSubject: BehaviorSubject<GetEmploye> = new BehaviorSubject<GetEmploye>(this.employeFilterSubject);
  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  employeSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  employeCurrentSubject: BehaviorSubject<EmployeCBFilter> = new BehaviorSubject<EmployeCBFilter>(this.cbSubject);

  employeSubject: BehaviorSubject<Employe | null> = new BehaviorSubject<Employe | null>(null);

  openModal(employe: Employe): void {
    this.employeSubject.next(employe);
  }



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
        return this.http.get<EmployeList>(`${environment.appUrl}/employe/get-employes`, { params: httpParams }).pipe(map((employelist) => {
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
      sortBy: 'firstName',
      isAscending: true,
      pageNumber: 1,
      pageSize: 8
    });

  }

 
}
