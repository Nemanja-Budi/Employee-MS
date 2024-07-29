import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuditLog } from 'src/app/models/auditlog.model';
import { AuditlogDto } from 'src/app/models/dto/auditlogDto';
import { EmployeChildDto } from 'src/app/models/dto/employe.childDto';
import { EmployeDto } from 'src/app/models/dto/employeDto';
import { EmployeSalaryDto } from 'src/app/models/dto/employeSalaryDto';
import { EmployeSalarySODto } from 'src/app/models/dto/employeSalarySODto';
import { EmployeSalarySOEDto } from 'src/app/models/dto/employeSalarySOEDto';
import { IncomeFromWorkDto } from 'src/app/models/dto/incomeFromWorkDto';
import { UserDTO } from 'src/app/models/dto/userDto';

@Injectable({
  providedIn: 'root'
})
export class AuditlogService {

  constructor(private http: HttpClient) { }

  getAuditLogs(): Observable<AuditlogDto[]> {
    return this.http.get<AuditLog[]>(`http://localhost:5000/api/auditlogs/get-auditlogs`).pipe(
      map((logs) => logs.map((log) => this.mapLogToDto(log)))
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
}
