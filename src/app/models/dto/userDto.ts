export class UserDTO {
    firstName: string; 
    lastName: string; 
    id: string; 
    userName: string; 
    email: string; 

    constructor(obj?: any) {
        this.firstName = obj && obj.firstName || '';
        this.lastName = obj && obj.lastName || '';
        this.id = obj && obj.id || '';
        this.userName = obj && obj.userName || '';
        this.email = obj && obj.email || '';
    }

}