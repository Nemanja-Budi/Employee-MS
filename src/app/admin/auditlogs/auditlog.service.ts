import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { SharedService } from 'src/app/shared/shared.service';

import { AuditLog } from 'src/app/models/auditlog.model';
import { AuditlogDto } from 'src/app/models/dto/auditlogDto';
import { GetAuditLog, getAuditLogCheckBox, GetAuditLogParams, getDefaultAuditLogFilter, mapLogToDto } from './types/auditlog.types';
import { CheckBoxFilter, CommonFilter, getDefaultCheckBoxFilter, getDefaultCommonFilter } from 'src/app/shared/types/shared.types';

@Injectable({
  providedIn: 'root'
})
export class AuditlogService {

  defaultAuditLogFilter: GetAuditLogParams = getDefaultAuditLogFilter();
  auditLogCheckBoxs: CheckBoxFilter[] = getAuditLogCheckBox();
  checkBoxSubject: CheckBoxFilter = getDefaultCheckBoxFilter();
  defaultCommonFilter: CommonFilter = getDefaultCommonFilter('operationType', 6);

  auditLogFilterSubject: GetAuditLog = {
    employeFilterDto: this.defaultAuditLogFilter,
    commonFilter: this.defaultCommonFilter
  }

  auditLogQuearyParamsSubject: BehaviorSubject<GetAuditLog> = new BehaviorSubject<GetAuditLog>(this.auditLogFilterSubject);
  auditLogCurrentSubject: BehaviorSubject<CheckBoxFilter> = new BehaviorSubject<CheckBoxFilter>(this.checkBoxSubject);
  auditLogSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");
  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  getAuditLogs(): Observable<{ totalCount: number, auditLogs: AuditlogDto[] }> {
    return this.auditLogQuearyParamsSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        const allFilters = { ...params.employeFilterDto, ...params.commonFilter };
        const { isAscending } = params.commonFilter;

        Object.keys(allFilters).forEach(key => {
          if (allFilters[key] && key !== 'isAscending') {
            if (key === 'changeDateTime') {
              console.log('pozivam se svaki put');
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

        return this.http.get<{ totalCount: number, auditLogs: AuditLog[] }>(`http://localhost:5000/api/auditlogs/get-auditlogs`, { params: httpParams }).pipe(
          map(response => {
            const mappedLogs = response.auditLogs.map(log => mapLogToDto(log));
            this.currentSize.next(Math.ceil(response.totalCount / params.commonFilter.pageSize));
            this.isNula.next(response.totalCount === 0);
            return {
              auditLogs: mappedLogs,
              totalCount: response.totalCount
            };
          })
        );
      })
    );
  }
  
  getAuditLogCheckBoxs(): CheckBoxFilter[] {
    return this.auditLogCheckBoxs.slice();
  }

  resetFilters(): void {
    this.auditLogCheckBoxs.forEach((auditlog) => {
      if(auditlog.name == "operationType") {
        auditlog.chacked = true;
      }
      else {
        auditlog.chacked = false;
      }
    });
    this.sharedService.isChange.next(false);
    this.sharedService.witchType.next('text');
    this.auditLogSearchSubject.next('');
    this.auditLogCurrentSubject.next(this.checkBoxSubject);
    this.auditLogQuearyParamsSubject.next({
      employeFilterDto: this.defaultAuditLogFilter,
      commonFilter: this.defaultCommonFilter
    });
  }
}
