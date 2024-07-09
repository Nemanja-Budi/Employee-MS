export class Member {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    isLocked: boolean;
    dateCreated: string;
    roles: string[];

    constructor(obj?: any) {
        this.id = obj && obj.id || '';
        this.userName = obj && obj.userName || '';
        this.firstName = obj && obj.firstName || '';
        this.lastName = obj && obj.lastName || '';
        this.isLocked = obj && obj.isLocked || false;
        this.dateCreated = obj && obj.dateCreated || '';
        this.roles = obj && obj.roles || [];
    }
}