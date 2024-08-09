export class EmployeChildDto {
    Id: string;
    Name: string;
    JMBG: string;
    Gender: string;

    constructor(obj?: any) {
        this.Id = obj && obj.Id || '';
        this.Name = obj && obj.Name || '';
        this.JMBG = obj && obj.JMBG || '';
        this.Gender = obj && obj.Gender || '';
    }
}


