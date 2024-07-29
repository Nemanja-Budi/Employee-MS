export class EmployeSalaryDto {
    Id: string;
    TotalNumberOfHours: number;
    TotalNumberOfWorkingHours: number;
    Sickness100: number;
    Sickness60: number;
    HoursOfAnnualVacation: number;
    WorkingHoursForTheHoliday: number;
    OvertimeHours: number;
    Credits: number;
    DamageCompensation: number;
    HolidayBonus: number;
    MealAllowance: number;
    EmployeId: string;
    // EmployeSalarySO: any; // Adjust type as necessary
    // EmployeSalarySOE: any; // Adjust type as necessary
    // IncomeFromWork: any; // Adjust type as necessary
  
    constructor(obj?: any) {
     this.Id = obj && obj.Id || '';
     this.TotalNumberOfHours = obj && obj.TotalNumberOfHours || 0;
     this.TotalNumberOfWorkingHours = obj && obj.TotalNumberOfWorkingHours || 0;
     this.Sickness100 = obj && obj.Sickness100 || 0;
     this.Sickness60 = obj && obj.Sickness60 || 0;
     this.HoursOfAnnualVacation = obj && obj.HoursOfAnnualVacation || 0;
     this.WorkingHoursForTheHoliday = obj && obj.WorkingHoursForTheHoliday || 0;
     this.OvertimeHours = obj && obj.OvertimeHours || 0;
     this.Credits = obj && obj.Credits || 0;
     this.DamageCompensation = obj && obj.DamageCompensation || 0;
     this.HolidayBonus = obj && obj.HolidayBonus || 0;
     this.MealAllowance = obj && obj.MealAllowance || 0;
     this.EmployeId = obj && obj.EmployeId || '';
    }
  }
  