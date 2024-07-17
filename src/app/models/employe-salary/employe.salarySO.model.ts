export class EmployeSalarySO {
        id: string;
        grossSalary: number;
        deductionPension: number;
        deductionHealth: number;
        expenseOfTheEmployer: number;
        employeSalaryId: string;
         [key: string]: any;
    
        constructor(obj?: any) {
            this.id = obj && obj.id || "";
            this.grossSalary = obj && obj.grossSalary || 0;
            this.deductionPension = obj && obj.deductionPension || 0;
            this.deductionHealth = obj && obj.deductionHealth || 0;
            this.expenseOfTheEmployer = obj && obj.expenseOfTheEmployer || 0;
            this.employeSalaryId = obj && obj.employeSalaryId || "";
        }
}
