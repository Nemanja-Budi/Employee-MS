import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { GetAnnualLeave } from './types/annual-leave.types';
import { EmployeCBFilter } from '../employe/types/employe.types';
import { AnnualLeaveList } from 'src/app/models/annual-leaves/annual.leave-list';

export type deleteMessage = {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnnualleaveService {

  annualleaveFilterSubject: GetAnnualLeave = {
    employeFilterDto: {
      firstName: '',
      lastName: ''
    },
    sortBy: 'firstName',
    isAscending: true,
    pageNumber: 1,
    pageSize: 12
  }

  cbSubject: EmployeCBFilter = {
    showName: '',
    name: '', 
    chacked: false
  }

  annualLeaveParams: EmployeCBFilter[] = [
    { showName: 'Ime', name: 'firstName', chacked: true },
    { showName: 'Prezime', name: 'lastName', chacked: false },
  ];

  annualleaveQuearyParamsSubject: BehaviorSubject<GetAnnualLeave> = new BehaviorSubject<GetAnnualLeave>(this.annualleaveFilterSubject);
  annualleaveCurrentSubject: BehaviorSubject<EmployeCBFilter> = new BehaviorSubject<EmployeCBFilter>(this.cbSubject);
  annualleaveSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentAnnualLeaveSubject: BehaviorSubject<AnnualLeave | null> = new BehaviorSubject<AnnualLeave | null>(null);
  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getAllAnnualLeave(): Observable<AnnualLeaveList> {
    return this.annualleaveQuearyParamsSubject.pipe(
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
        return this.http.get<AnnualLeaveList>(`http://localhost:5000/api/annualleave/get-annualleaves`, { params: httpParams }).pipe(map((annualleave) => {
          this.currentSize.next(Math.ceil(annualleave.totalCount/params.pageSize));
          if(annualleave.totalCount == 0) {
            this.isNula.next(true);
          } else {
            this.isNula.next(false);
          }
          return annualleave;
        }));
      })
    );
  }

  getAnnualLeaveById(id: string): Observable<AnnualLeave> {
    return this.http.get<AnnualLeave>(`http://localhost:5000/api/AnnualLeave/get-annualleave/${id}`);
  }

  addAnnualLeave(annualleave: AnnualLeave): Observable<AnnualLeave> {
    return this.http.post<AnnualLeave>(`http://localhost:5000/api/annualleave/create-annualleave`, annualleave);
  }

  updateAnnualLeave(annualleave: AnnualLeave): Observable<AnnualLeave> {
    return this.http.put<AnnualLeave>(`http://localhost:5000/api/annualleave/edit-annualleave/${annualleave.annualLeaveId}`, annualleave);
  }

  deleteAnnualLeave(annualleaveId: string): Observable<deleteMessage> {
    return this.http.delete<deleteMessage>(`http://localhost:5000/api/annualleave/delete-annualleave/${annualleaveId}`);
  }

  getAnnualLeaveParams(): EmployeCBFilter[] {
    return this.annualLeaveParams.slice();
  }

  resetFilters(): void {
    this.annualLeaveParams.forEach((employe) => {
      if(employe.name == "firstName") {
        employe.chacked = true;
      }
      else {
        employe.chacked = false;
      }
    });
    this.annualleaveSearchSubject.next('');
    this.annualleaveCurrentSubject.next({
      showName: '',
      name: '',
      chacked: false
    });
    this.annualleaveQuearyParamsSubject.next({
      employeFilterDto: {
        firstName: '',
        lastName: ''
      },
      sortBy: '',
      isAscending: false,
      pageNumber: 1,
      pageSize: 12
    });
  }
}
