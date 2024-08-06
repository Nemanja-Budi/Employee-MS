export type GetEmployeSalaryParams = {
  firstName: string;
  lastName: string;
  bankName: string;
  calculationMonth: string;
  [key: string]: string | any;
}

export type GetEmployeSalary = {
  employeFilterDto: GetEmployeSalaryParams;
  sortBy: string;
  isAscending: boolean;
  pageNumber: number;
  pageSize: number;
}

export type BankAccount = {
  bankName: string;
  racun: string;
} 

export type CustomBank = {
  bankName: string;
  totalNetSalary: number;
  racun: string;
}
  