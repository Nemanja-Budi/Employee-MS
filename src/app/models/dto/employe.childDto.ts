export class EmployeChildDto {
    Id: string;
    Name: string;
    Jmbg: string;
    Gender: string;

    constructor(obj?: any) {
        this.Id = obj && obj.Id || '';
        this.Name = obj && obj.Name || '';
        this.Jmbg = obj && obj.Jmbg || '';
        this.Gender = obj && obj.Gender || '';
    }
}


