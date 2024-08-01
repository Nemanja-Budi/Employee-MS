import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { AuditLog } from 'src/app/models/auditlog.model';
import { AuditlogDto } from 'src/app/models/dto/auditlogDto';
import { EmployeChildDto } from 'src/app/models/dto/employe.childDto';
import { EmployeDto } from 'src/app/models/dto/employeDto';
import { EmployeSalaryDto } from 'src/app/models/dto/employeSalaryDto';
import { EmployeSalarySODto } from 'src/app/models/dto/employeSalarySODto';
import { EmployeSalarySOEDto } from 'src/app/models/dto/employeSalarySOEDto';
import { IncomeFromWorkDto } from 'src/app/models/dto/incomeFromWorkDto';
import { UserDTO } from 'src/app/models/dto/userDto';
import { GetAuditLog } from './types/auditlog.types';
import { EmployeCBFilter } from 'src/app/employes/employe/types/employe.types';
import { SharedService } from 'src/app/shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuditlogService {

  auditLogFilterSubject: GetAuditLog = {
    employeFilterDto: {
      userName: '',
      tableName: '',
      operationType: '',
      changeDateTime: ''
    },
    sortBy: 'operationType',
    isAscending: false,
    pageNumber: 1,
    pageSize: 5
  }

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  auditLogQuearyParamsSubject: BehaviorSubject<GetAuditLog> = new BehaviorSubject<GetAuditLog>(this.auditLogFilterSubject);
  currentSize: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  isNula: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  auditLogSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  auditLogParams: EmployeCBFilter[] = [
    { showName: 'Operation Type', name: 'operationType', chacked: true },
    { showName: 'Username', name: 'userName', chacked: false },
    { showName: 'Table name', name: 'tableName', chacked: false },
    { showName: 'Action time', name: 'changeDateTime', chacked: false },
  ];

  getAuditLogParamsParams(): EmployeCBFilter[] {
    return this.auditLogParams.slice();
  }

  private formatDate(dateInput: string): string {
    const dateParts = dateInput.split('-');

    if (dateParts.length === 1) {
        // Ako je samo godina
        return `${dateParts[0]}`;
    } else if (dateParts.length === 2) {
        // Ako je godina i mesec
        return `${dateParts[0]}-${dateParts[1].padStart(2, '0')}`;
    } else if (dateParts.length === 3) {
        // Ako je puni datum
        const day = dateParts[2].padStart(2, '0');
        return `${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${day === '00' ? '01' : day}`;
    } else {
        throw new Error('Invalid date input');
    }
  }
  
  getAuditLogs(): Observable<{ totalCount: number, auditLogs: AuditlogDto[] }> {
    return this.auditLogQuearyParamsSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        const filterDto = params.employeFilterDto;
        Object.keys(filterDto).forEach(key => {
          if (filterDto[key]) {
            if (key === 'changeDateTime') {
              console.log('pozivam se svaki put');
              const formattedDate = this.formatDate(filterDto[key]);
              httpParams = httpParams.append(key, formattedDate);
            } else {
              httpParams = httpParams.append(key, filterDto[key]);
            }
          }
        });
        if (params.sortBy) httpParams = httpParams.append('sortBy', params.sortBy);
        if (params.isAscending !== undefined) httpParams = httpParams.append('isAscending', params.isAscending.toString());
        if (params.pageNumber) httpParams = httpParams.append('pageNumber', params.pageNumber);
        if (params.pageSize) httpParams = httpParams.append('pageSize', params.pageSize);
        else httpParams = httpParams.append('pageSize', '15'); // Default pageSize
  
        return this.http.get<{ totalCount: number, auditLogs: AuditLog[] }>(`http://localhost:5000/api/auditlogs/get-auditlogs`, { params: httpParams }).pipe(
          map(response => {
            const mappedLogs = response.auditLogs.map(log => this.mapLogToDto(log));
            this.currentSize.next(Math.ceil(response.totalCount / params.pageSize));
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
  
  private mapLogToDto(log: AuditLog): AuditlogDto {
    const user = new UserDTO(log.user);
    const tableToDtoMap: { [key: string]: any } = {
      'Employe': EmployeDto,
      'EmployeChild': EmployeChildDto,
      'EmployeSalary': EmployeSalaryDto,
      'EmployeSalarySO': EmployeSalarySODto,
      'EmployeSalarySOE': EmployeSalarySOEDto,
      'IncomeFromWork': IncomeFromWorkDto
    };

    let newDataInstance: any;
    let oldDataInstance: any;

    if (log.newData !== '') {
      const DtoClass = tableToDtoMap[log.tableName];
      if (DtoClass) {
        const parsedNewData = JSON.parse(log.newData);
        newDataInstance = new DtoClass(parsedNewData);
      }
    }

    if (log.oldData !== '') {
      const DtoClass = tableToDtoMap[log.tableName];
      if (DtoClass) {
        const parsedOldData = JSON.parse(log.oldData);
        oldDataInstance = new DtoClass(parsedOldData);
      }
    }

    const auditLogDto: AuditlogDto = {
      auditLogId: log.auditLogId,
      tableName: log.tableName,
      operationType: log.operationType,
      user: user,
      changeDateTime: log.changeDateTime,
      ...this.mapDtoInstanceToLog(log.tableName, newDataInstance, oldDataInstance)
    };

    return auditLogDto;
  }

  private mapDtoInstanceToLog(tableName: string, newDataInstance: any, oldDataInstance: any) {
    switch (tableName) {
      case 'Employe':
        return { newEmployeDto: newDataInstance, oldEmployeDto: oldDataInstance };
      case 'EmployeChild':
        return { newEmployeChild: newDataInstance, oldEmployeChild: oldDataInstance };
      case 'EmployeSalary':
        return { newEmployeSalary: newDataInstance, oldEmployeSalary: oldDataInstance };
      case 'EmployeSalarySO':
        return { newEmployeSalarySO: newDataInstance, oldEmployeSalarySO: oldDataInstance };
      case 'EmployeSalarySOE':
        return { newEmployeSalarySOE: newDataInstance, oldEmployeSalarySOE: oldDataInstance };  
      case 'IncomeFromWork':
        return { newIncomeFromWork: newDataInstance, oldIncomeFromWork: oldDataInstance };
      default:
        return {};
    }
  }

  resetFilters(): void {
    this.auditLogParams.forEach((auditlog) => {
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
    this.auditLogQuearyParamsSubject.next({
      employeFilterDto: {
        userName: '',
        tableName: '',
        operationType: '',
        changeDateTime: ''
      },
      sortBy: 'firstName',
      isAscending: true,
      pageNumber: 1,
      pageSize: 15
    });
  }
}
