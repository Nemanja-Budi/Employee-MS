import { AuditLog } from "src/app/models/auditlog.model";
import { AnnualLeaveDto } from "src/app/models/dto/annualLeaveDto";
import { AuditlogDto } from "src/app/models/dto/auditlogDto";
import { EmployeChildDto } from "src/app/models/dto/employe.childDto";
import { EmployeDto } from "src/app/models/dto/employeDto";
import { EmployeSalaryDto } from "src/app/models/dto/employeSalaryDto";
import { EmployeSalarySODto } from "src/app/models/dto/employeSalarySODto";
import { EmployeSalarySOEDto } from "src/app/models/dto/employeSalarySOEDto";
import { IncomeFromWorkDto } from "src/app/models/dto/incomeFromWorkDto";
import { UserDTO } from "src/app/models/dto/userDto";
import { UserToShow } from "src/app/models/dto/userToShowDto";
import { CheckBoxFilter, CommonFilter } from "src/app/shared/types/shared.types";

export type GetAuditLogParams = {
  userName: string;
  tableName: string;
  operationType: string;
  changeDateTime: string
  [key: string]: string | number;
}

export type GetAuditLog = {
  employeFilterDto: GetAuditLogParams;
  commonFilter: CommonFilter;
}

export function getDefaultAuditLogFilter(): GetAuditLogParams {
  return {
    userName: '',
    tableName: '',
    operationType: '',
    changeDateTime: ''
  };
}

export function getAuditLogCheckBox(): CheckBoxFilter[] {
  const auditLogCheckBox =[
    { showName: 'Operation', name: 'operationType', chacked: true },
    { showName: 'Username', name: 'userName', chacked: false },
    { showName: 'Table', name: 'tableName', chacked: false },
    { showName: 'Time', name: 'changeDateTime', chacked: false },
  ];
  return auditLogCheckBox
}

export function mapLogToDto(log: AuditLog): AuditlogDto {
  const user = new UserDTO(log.user);
  const tableToDtoMap: { [key: string]: any } = {
    'Employe': EmployeDto,
    'EmployeChild': EmployeChildDto,
    'EmployeSalary': EmployeSalaryDto,
    'EmployeSalarySO': EmployeSalarySODto,
    'EmployeSalarySOE': EmployeSalarySOEDto,
    'IncomeFromWork': IncomeFromWorkDto,
    'AnnualLeave': AnnualLeaveDto,
    'User': UserToShow
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
    ...mapDtoInstanceToLog(log.tableName, newDataInstance, oldDataInstance)
  };

  return auditLogDto;
}

export function mapDtoInstanceToLog(tableName: string, newDataInstance: any, oldDataInstance: any) {
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
    case 'AnnualLeave':
      return { newAnnualLeave: newDataInstance, oldAnnualLeave: oldDataInstance };
    case 'User':
      return { newUser: newDataInstance, oldUser: oldDataInstance };
    default:
      return {};
  }
}
  