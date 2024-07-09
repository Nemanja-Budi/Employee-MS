import { Member } from "./member.model";

export class MemberList {
    totalCount: number;
    members: Member[];

    constructor(obj?: any) {
        this.totalCount = obj && obj.totalCount || 0;
        this.members = obj && obj.members.map((member: any) => new Member(member)) || [];
    }
}