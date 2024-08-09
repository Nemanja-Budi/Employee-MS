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
  