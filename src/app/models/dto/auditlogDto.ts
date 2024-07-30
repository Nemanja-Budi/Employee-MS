import { EmployeChildDto } from "./employe.childDto";
import { EmployeDto } from "./employeDto";
import { EmployeSalaryDto } from "./employeSalaryDto";
import { EmployeSalarySODto } from "./employeSalarySODto";
import { EmployeSalarySOEDto } from "./employeSalarySOEDto";
import { IncomeFromWorkDto } from "./incomeFromWorkDto";
import { UserDTO } from "./userDto";

export interface AuditlogDto {
    auditLogId: string;
    tableName: string;
    operationType: string;
    user: UserDTO;
    newEmployeDto?: EmployeDto;
    oldEmployeDto?: EmployeDto;
    newEmployeChild?: EmployeChildDto;
    oldEmployeChild?: EmployeChildDto;
    newEmployeSalary?: EmployeSalaryDto;
    oldEmployeSalary?: EmployeSalaryDto;
    newEmployeSalarySO?: EmployeSalarySODto;
    oldEmployeSalarySO?: EmployeSalarySODto;
    newEmployeSalarySOE?: EmployeSalarySOEDto;
    oldEmployeSalarySOE?: EmployeSalarySOEDto;
    newIncomeFromWork?: IncomeFromWorkDto;
    oldIncomeFromWork?: IncomeFromWorkDto;
    changeDateTime: Date;
    [key: string]: any; 
}