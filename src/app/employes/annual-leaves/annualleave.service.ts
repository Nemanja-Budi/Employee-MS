import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { DeleteMessage, GetAnnualLeave, getAnnualLeaveCheckBoxes, GetAnnualleaveParams, getDefaultAnnualLeaveFilter } from './types/annual-leave.types';
import { AnnualLeaveList } from 'src/app/models/annual-leaves/annual.leave-list';
import { CheckBoxFilter, CommonFilter, getDefaultCheckBoxFilter, getDefaultCommonFilter } from 'src/app/shared/types/shared.types';

@Injectable({
  providedIn: 'root'
})
export class AnnualleaveService {

  defaultAnnualLeaveFilter:GetAnnualleaveParams = getDefaultAnnualLeaveFilter();
  annualLeaveCheckBox: CheckBoxFilter[] = getAnnualLeaveCheckBoxes();
  checkBoxSubject: CheckBoxFilter = getDefaultCheckBoxFilter();
  defaultCommonFilter: CommonFilter = getDefaultCommonFilter('firstName', 9);
  
  annualleaveFilterSubject: GetAnnualLeave = {
    employeFilterDto: this.defaultAnnualLeaveFilter,
    commonFilter: this.defaultCommonFilter
  }

  annualleaveQuearyParamsSubject: BehaviorSubject<GetAnnualLeave> = new BehaviorSubject<GetAnnualLeave>(this.annualleaveFilterSubject);
  annualleaveCurrentSubject: BehaviorSubject<CheckBoxFilter> = new BehaviorSubject<CheckBoxFilter>(this.checkBoxSubject);
  annualleaveSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentAnnualLeaveSubject: BehaviorSubject<AnnualLeave | null> = new BehaviorSubject<AnnualLeave | null>(null);
  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getAllAnnualLeave(): Observable<AnnualLeaveList> {
    return this.annualleaveQuearyParamsSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        const allFilters = { ...params.employeFilterDto, ...params.commonFilter };
        Object.keys(allFilters).forEach(key => {
          const value = allFilters[key];
          if (value) {
            httpParams = httpParams.append(key, value);
          }
        });
        return this.http.get<AnnualLeaveList>(`http://localhost:5000/api/annualleave/get-annualleaves`, { params: httpParams }).pipe(map((annualleave) => {
          this.currentSize.next(Math.ceil(annualleave.totalCount/params.commonFilter.pageSize));
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

  deleteAnnualLeave(annualleaveId: string): Observable<DeleteMessage> {
    return this.http.delete<DeleteMessage>(`http://localhost:5000/api/annualleave/delete-annualleave/${annualleaveId}`);
  }

  getAnnualLeaveCheckBox(): CheckBoxFilter[] {
    return this.annualLeaveCheckBox.slice();
  }

  resetFilters(): void {
    this.annualLeaveCheckBox.forEach((al) => {
      if(al.name == "firstName") {
        al.chacked = true;
      }
      else {
        al.chacked = false;
      }
    });
    this.annualleaveSearchSubject.next('');
    this.annualleaveCurrentSubject.next(this.checkBoxSubject);
    this.annualleaveQuearyParamsSubject.next({
      employeFilterDto: this.defaultAnnualLeaveFilter,
      commonFilter: this.defaultCommonFilter
    });
  }
}
