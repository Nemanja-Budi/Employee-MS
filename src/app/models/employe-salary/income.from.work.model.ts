export class IncomeFromWork {
    id: string;
    workinHours: number;
    sickness60: number;
    sickness100: number;
    annualVacation: number;
    holidayHours: number;
    overtimeHours: number;
    credit: number;
    demage: number;
    hotMeal: number;
    regres: number;
    grossSalary: number;
    employeSalaryId: string;
    [key: string]: any;
    
    constructor(obj?: any) {
        this.id = obj && obj.id || "";
        this.workinHours = obj && obj.workinHours || 0;
        this.sickness60 = obj && obj.sickness60 || 0;
        this.sickness100 = obj && obj.sickness100 || 0;
        this.annualVacation = obj && obj.annualVacation || 0;
        this.holidayHours = obj && obj.holidayHours || 0;
        this.overtimeHours = obj && obj.overtimeHours || 0;
        this.credit = obj && obj.credit || 0;
        this.demage = obj && obj.demage || 0;
        this.hotMeal = obj && obj.hotMeal || 0;
        this.regres = obj && obj.regres || 0;
        this.grossSalary = obj && obj.grossSalary || 0;
        this.employeSalaryId = obj && obj.employeSalaryId || "";
    }
}