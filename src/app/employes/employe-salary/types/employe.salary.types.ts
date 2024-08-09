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

export type BankAccount = {
  bankName: string;
  racun: string;
} 

export type CustomBank = {
  bankName: string;
  totalNetSalary: number;
  racun: string;
}
  
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

export function getBankAccounts(): BankAccount[] {
  const bankAccounts = [
    { bankName: 'Komercijalna Banka', racun: '908-20501-70' },
    { bankName: 'Raiffeisen Banka', racun: '908-26501-15' },
    { bankName: 'Aik Banka', racun: '908-10501-97'},
    { bankName: 'Yettel Banka', racun: '908-11501-07' },
    { bankName: 'Euro Bank Direktna', racun: '908-15001-80' },
    { bankName: 'Banka Intesa', racun: '908-16001-87' },
    { bankName: 'OTP Banka', racun: '908-32501-57' },
  ];
   
  return bankAccounts.slice();
}
  