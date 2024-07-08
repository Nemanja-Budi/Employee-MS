import { EmployeChild } from "./employe.child.model";
import { EmployeSalary } from "./employe-salary/employe.salary.model";

export interface Employe {
    id?: string;
    firstName: string;
    lastName: string;
    nameOfParent: string;
    dateOfBirth: Date;
    jmbg: string;
    hourlyRate: number;
    gender: 'M' | 'F';
    identityCardNumber: string;
    phone: string;
    address: string;
    email: string;
    placeOfBirth: string;
    dateOfEmployment: Date;
    pio: number;
    school?: string;
    college?: string;
    position: string;
    employmentContract: string;
    amendmentContract: string;
    bankName: string;
    currentAccount: number;
    employeChild?: EmployeChild[];
    [key: string]: any;
}