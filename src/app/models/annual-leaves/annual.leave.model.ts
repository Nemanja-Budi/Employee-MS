import { User } from "src/app/account/models/user.model";
import { Employe } from "../employe/employe.model";


export interface AnnualLeave {
    annualLeaveId: string; // Guid is represented as string in TypeScript
    employeId: string; // Guid is represented as string in TypeScript
    employe: Employe;
    startDate: Date;
    endDate: Date;
    reason: string;
    comments: string;
    approved: boolean;
    requestDate: Date;
    approvalDate: Date;
    totalDays: number;
    usedDays: number;
    isPaid: boolean;
    isCarryOver: boolean;
    isSickLeave: boolean;
    createdByUserId?: string;
    createdByUser?: User;
    createdDate: Date;
}