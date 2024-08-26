import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment.development.ts';
import { MemberAddEdit } from './models/member-add-edit';
import { MemberList } from './models/member-list.model';
import { getDefaultMemberFilter, GetMember, getMemberCheckBox, GetMemberParams } from './types/admin.types';
import { CheckBoxFilter, CommonFilter, getDefaultCheckBoxFilter, getDefaultCommonFilter } from '../shared/types/shared.types';

//PREGLEDANO OKE

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  defaultMemberFilter: GetMemberParams = getDefaultMemberFilter();
  memberCheckBoxs: CheckBoxFilter[] = getMemberCheckBox();
  checkBoxSubject: CheckBoxFilter = getDefaultCheckBoxFilter();
  defaultCommonFilter: CommonFilter = getDefaultCommonFilter('userName', 15);
  
  memberFilterSubject: GetMember = {
    employeFilterDto: this.defaultMemberFilter,
    commonFilter: this.defaultCommonFilter
  }

  memberQuearyParamsSubject: BehaviorSubject<GetMember> = new BehaviorSubject<GetMember>(this.memberFilterSubject);
  memberCurrentSubject: BehaviorSubject<CheckBoxFilter> = new BehaviorSubject<CheckBoxFilter>(this.checkBoxSubject);
  memberSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getMembers(): Observable<MemberList> {
    return this.memberQuearyParamsSubject.pipe(
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
        
        return this.http.get<MemberList>(`${environment.appUrl}/admin/get-members`,{ params: httpParams }).pipe(map((members) => {
          this.currentSize.next(Math.ceil(members.totalCount/params.commonFilter.pageSize));
          if(members.totalCount == 0) {
            this.isNula.next(true);
          } else {
            this.isNula.next(false);
          }
          return members;
        }));
      })
    );
  }

  getMemberCheckBoxs(): CheckBoxFilter[] {
    return this.memberCheckBoxs.slice();
  }

  getMember(id: string) {
    return this.http.get<MemberAddEdit>(`${environment.appUrl}/admin/get-member/${id}`);
  }

  addEditMember(memberAddEdit: MemberAddEdit) {
    return this.http.post(`${environment.appUrl}/admin/add-edit-member`, memberAddEdit);
  }

  lockMember(member_id: string) {
    return this.http.put(`${environment.appUrl}/admin/lock-member/${member_id}`, {});
  }

  unlockMember(member_id: string) {
    return this.http.put(`${environment.appUrl}/admin/unlock-member/${member_id}`, {});
  }

  deleteMember(member_id: string) {
    return this.http.delete(`${environment.appUrl}/admin/delete-member/${member_id}`, {});
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.appUrl}/admin/get-application-roles`);
  }

}
