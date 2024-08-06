export type GetAnnualleaveParams = {
    firstName: string;
    lastName: string;
    // bankName: string;
    [key: string]: string | number;
  }
  
export type GetAnnualLeave = {
    employeFilterDto: GetAnnualleaveParams;
    sortBy: string;
    isAscending: boolean;
    pageNumber: number;
    pageSize: number;
}
  