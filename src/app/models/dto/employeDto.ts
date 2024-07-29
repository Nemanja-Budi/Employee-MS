export class EmployeDto {
    Id: string;
    FirstName: string;
    LastName: string;
    NameOfParent: string;
    DateOfBirth: string;
    JMBG: string;
    HourlyRate: number;
    Gender: string;
    IdentityCardNumber: string;
    Phone: string;
    Address: string;
    Email: string;
    PlaceOfBirth: string;
    DateOfEmployment: string;
    PIO: number;
    School: string;
    College: string;
    Position: string;
    EmploymentContract: string;
    AmendmentContract: string;
    BankName: string;
    CurrentAccount: number;
  
    constructor(obj?: any) {
      this.Id = obj && obj.Id || '';
      this.FirstName = obj && obj.FirstName || '';
      this.LastName = obj && obj.LastName || '';
      this.NameOfParent = obj && obj.NameOfParent || '';
      this.DateOfBirth = obj && obj.DateOfBirth || '';
      this.JMBG = obj && obj.JMBG || '';
      this.HourlyRate = obj && obj.HourlyRate || 0;
      this.Gender = obj && obj.Gender || '';
      this.IdentityCardNumber = obj && obj.IdentityCardNumber || '';
      this.Phone = obj && obj.Phone || '';
      this.Address = obj && obj.Address || '';
      this.Email = obj && obj.Email || '';
      this.PlaceOfBirth = obj && obj.PlaceOfBirth || '';
      this.DateOfEmployment = obj && obj.DateOfEmployment || '';
      this.PIO = obj && obj.PIO || 0;
      this.School = obj && obj.School || '';
      this.College = obj && obj.College || '';
      this.Position = obj && obj.Position || '';
      this.EmploymentContract = obj && obj.EmploymentContract || '';
      this.AmendmentContract = obj && obj.AmendmentContract || '';
      this.BankName = obj && obj.BankName || '';
      this.CurrentAccount = obj && obj.CurrentAccount || 0;
    }
  }