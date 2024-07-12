import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Employe } from 'src/app/models/employe.model';
import { EmployeList } from './employe.list.model';
import { environment } from 'src/environments/environment.development.ts';

export type GetEmployeParams = {
  firstName: string;
  lastName: string;
  jmbg: string;
  identityCardNumber: string;
  phone: string;
  address: string;
  email: string;
  pio: number;
  position: string,
  employmentContract: string,
  amendmentContract: string,
  bankName: string,
  currentAccount: number
}

export type GetEmploye = {
  employeFilterDto: GetEmployeParams;
  sortBy: string;
  isAscending: boolean;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class Employe2Service {

  proba: GetEmploye = {
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

  employeQuearyParamsSubject: BehaviorSubject<GetEmploye> = new BehaviorSubject<GetEmploye>(this.proba);

  constructor(private http: HttpClient ) { }


   getEmployes(): Observable<EmployeList> {
    return this.employeQuearyParamsSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();

        const filterDto = params.employeFilterDto;

        if (filterDto.firstName) httpParams = httpParams.append('firstName', filterDto.firstName);
        if (filterDto.lastName) httpParams = httpParams.append('lastName', filterDto.lastName);
        if (filterDto.jmbg) httpParams = httpParams.append('jmbg', filterDto.jmbg);
        if (filterDto.identityCardNumber) httpParams = httpParams.append('identityCardNumber', filterDto.identityCardNumber);
        if (filterDto.phone) httpParams = httpParams.append('phone', filterDto.phone);
        if (filterDto.address) httpParams = httpParams.append('address', filterDto.address);
        if (filterDto.email) httpParams = httpParams.append('email', filterDto.email);
        if (filterDto.pio) httpParams = httpParams.append('pio', filterDto.pio);
        if (filterDto.position) httpParams = httpParams.append('position', filterDto.position);
        if (filterDto.employmentContract) httpParams = httpParams.append('employmentContract', filterDto.employmentContract);
        if (filterDto.amendmentContract) httpParams = httpParams.append('amendmentContract', filterDto.amendmentContract);
        if (filterDto.bankName) httpParams = httpParams.append('bankName', filterDto.bankName);
        if (filterDto.currentAccount) httpParams = httpParams.append('currentAccount', filterDto.currentAccount);
        if (params.sortBy) httpParams = httpParams.append('sortBy', params.sortBy);
        if (params.isAscending !== undefined) httpParams = httpParams.append('isAscending', params.isAscending.toString());
        if (params.pageNumber) httpParams = httpParams.append('pageNumber', params.pageNumber);
        if (params.pageSize) httpParams = httpParams.append('pageSize', params.pageSize);
        else httpParams = httpParams.append('pageSize', '50');

        return this.http.get<EmployeList>(`${environment.appUrl}/employe/get-employes`, { params: httpParams });
      })
    );
  }
}
