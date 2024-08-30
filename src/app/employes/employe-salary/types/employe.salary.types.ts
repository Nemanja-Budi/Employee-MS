import { CheckBoxFilter, CommonFilter } from "src/app/shared/types/shared.types";

export type GetEmployeSalary = {
  employeFilterDto: GetEmployeSalaryParams;
  commonFilter: CommonFilter;
}

export type GetEmployeSalaryParams = {
  firstName: string;
  lastName: string;
  bankName: string;
  calculationMonth: string;
  [key: string]: string | any;
}

// export type BankAccount = {
//   bankName: string;
//   racun: string;
// } 

export function getDefaultEmployeSalaryFilter(): GetEmployeSalaryParams {
  return {
    firstName: '',
    lastName: '',
    bankName: '',
    calculationMonth: ''
  };
}

export function getEmployeSalaryCheckBoxes(): CheckBoxFilter[]  {
  let employeSalaryCheckBox = [
    { showName: 'Ime', name: 'firstName', chacked: true },
    { showName: 'Prezime', name: 'lastName', chacked: false },
    { showName: 'Banka', name: 'bankName', chacked: false },
    { showName: 'Mesec', name: 'calculationMonth', chacked: false }
  ];
  return employeSalaryCheckBox.slice();
}
  