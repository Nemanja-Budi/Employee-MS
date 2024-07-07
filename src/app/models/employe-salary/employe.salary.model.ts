import { EmployeSalarySO } from "./employe.salarySO.model";
import { EmployeSalarySOE } from "./employe.salarySOE.model";
import { IncomeFromWork } from "./income.from.work.model";

export interface EmployeSalary {
    id?: string;
    totalNumberOfHours: number;
    totalNumberOfWorkingHours: number;
    sickness100: number;
    sickness60: number;
    hoursOfAnnualVacation: number;
    workingHoursForTheHoliday: number;
    overtimeHours: number;
    credits: number;
    damageCompensation: number;
    holidayBonus?: number;
    mealAllowance?: number;
    employeId: string;
    employeSalarySO?: EmployeSalarySO;
    employeSalarySOE?: EmployeSalarySOE;
    incomeFromWork?: IncomeFromWork;
}