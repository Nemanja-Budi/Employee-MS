export class IncomeFromWorkDto {
    Id: string;
    WorkinHours: number;
    Sickness60: number;
    Sickness100: number;
    AnnualVacation: number;
    HolidayHours: number;
    OvertimeHours: number;
    Credit: number;
    Demage: number;
    HotMeal: number;
    Regres: number;
    GrossSalary: number;
    EmployeSalaryId: string;

    constructor(obj?: any) {
        this.Id = obj && obj.Id || '';
        this.WorkinHours = obj && obj.WorkinHours || 0;
        this.Sickness60 = obj && obj.Sickness60 || 0;
        this.Sickness100 = obj && obj.Sickness100 || 0;
        this.AnnualVacation = obj && obj.AnnualVacation || 0;
        this.HolidayHours = obj && obj.HolidayHours || 0;
        this.OvertimeHours = obj && obj.OvertimeHours || 0;
        this.Credit = obj && obj.Credit || 0;
        this.Demage = obj && obj.Demage || 0;
        this.HotMeal = obj && obj.HotMeal || 0;
        this.Regres = obj && obj.Regres || 0;
        this.GrossSalary = obj && obj.GrossSalary || 0;
        this.EmployeSalaryId = obj && obj.EmployeSalaryId || '';
    }
}