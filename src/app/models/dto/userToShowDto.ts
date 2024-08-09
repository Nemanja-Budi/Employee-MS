export class UserToShow {
    FirstName: string; 
    LastName: string; 
    Id: string; 
    UserName: string; 
    Email: string; 

    constructor(obj?: any) {
        this.FirstName = obj && obj.FirstName || '';
        this.LastName = obj && obj.LastName || '';
        this.Id = obj && obj.Id || '';
        this.UserName = obj && obj.UserName || '';
        this.Email = obj && obj.Email || '';
    }

}