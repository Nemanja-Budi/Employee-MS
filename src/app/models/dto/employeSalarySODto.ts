export class EmployeSalarySODto {
    Id: string;
    GrossSalary: number;
    DeductionPension: number;
    DeductionHealth: number;
    ExpenseOfTheEmployer: number;
    EmployeSalaryId: string;

    constructor(obj?: any) {
        this.Id = obj && obj.Id || '';
        this.GrossSalary = obj && obj.GrossSalary || 0;
        this.DeductionPension = obj && obj.DeductionPension || 0;
        this.DeductionHealth = obj && obj.DeductionHealth || 0;
        this.ExpenseOfTheEmployer = obj && obj.ExpenseOfTheEmployer || 0;
        this.EmployeSalaryId = obj && obj.EmployeSalaryId || '';
    }
}