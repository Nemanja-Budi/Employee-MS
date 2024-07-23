export class EmployeSalarySOE{
    id: string;
    grossSalary: number;
    deductionPension: number;
    deductionHealth: number;
    deductionUnemployment: number;
    deductionTaxRelief: number;
    expenseOfTheEmploye: number;
    netoSalary: number;
    employeSalaryId: string;
    [key: string]: any;
    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.grossSalary = obj && obj.grossSalary || 0;
        this.deductionPension = obj && obj.deductionPension || 0;
        this.deductionHealth = obj && obj.deductionHealth || 0;
        this.deductionUnemployment = obj && obj.deductionUnemployment || 0;
        this.deductionTaxRelief = obj && obj.deductionTaxRelief || 0;
        this.expenseOfTheEmploye = obj && obj.expenseOfTheEmploye || 0;
        this.netoSalary = obj && obj.netoSalary || 0;
        this.employeSalaryId = obj && obj.employeSalaryId || "";
    }
}