export type GetAuditLogParams = {
    userName: string;
    tableName: string;
    operationType: string;
    changeDateTime: string
    [key: string]: string | number;
  }
  
  export type GetAuditLog = {
    employeFilterDto: GetAuditLogParams;
      sortBy: string;
      isAscending: boolean;
      pageNumber: number;
      pageSize: number;
  }
  