import { EmployeSalary } from "./employe.salary.model";

export interface EmployeSalaryList {
    totalCount: number;
    employeSalarys: EmployeSalary[];
}