export class EmployeSalarySOEDto {
    Id: string;
    GrossSalary: number;
    DeductionPension: number;
    DeductionHealth: number;
    DeductionUnemployment: number;
    DeductionTaxRelief: number;
    NetoSalary: number;
    ExpenseOfTheEmploye: number;
    EmployeSalaryId: string;

    constructor(obj?: any) {
        this.Id = obj && obj.Id || '';
        this.GrossSalary = obj && obj.GrossSalary || 0;
        this.DeductionPension = obj && obj.DeductionPension || 0;
        this.DeductionHealth = obj && obj.DeductionHealth || 0;
        this.DeductionUnemployment = obj && obj.DeductionUnemployment || 0;
        this.DeductionTaxRelief = obj && obj.DeductionTaxRelief || 0;
        this.NetoSalary = obj && obj.NetoSalary || 0;
        this.ExpenseOfTheEmploye = obj && obj.ExpenseOfTheEmploye || 0;
        this.EmployeSalaryId = obj && obj.EmployeSalaryId || '';
    }
}