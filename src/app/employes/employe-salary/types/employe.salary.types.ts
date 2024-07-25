export type GetEmployeSalaryParams = {
    firstName: string;
    lastName: string;
    [key: string]: string | number;
}

export type GetEmployeSalary = {
    employeFilterDto: GetEmployeSalaryParams;
      sortBy: string;
      isAscending: boolean;
      pageNumber: number;
      pageSize: number;
}
