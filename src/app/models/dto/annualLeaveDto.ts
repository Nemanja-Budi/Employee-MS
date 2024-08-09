import { UserDTO } from "./userDto";

export class AnnualLeaveDto {
    AnnualLeaveId: string; // Guid is represented as string in TypeScript
    EmployeId: string; // Guid is represented as string in TypeScript
    StartDate: Date;
    EndDate: Date;
    Reason: string;
    Comments: string;
    Approved: boolean;
    RequestDate: Date;
    ApprovalDate: Date;
    TotalDays: number;
    UsedDays: number;
    IsPaid: boolean;
    IsCarryOver: boolean;
    IsSickLeave: boolean;
    CreatedDate: Date;

    constructor(obj?: any) {
        this.AnnualLeaveId = obj && obj.AnnualLeaveId || '';
        this.EmployeId = obj && obj.EmployeId || '';
        this.StartDate = obj && obj.StartDate || '';
        this.EndDate = obj && obj.EndDate || '';
        this.Reason = obj && obj.Reason || '';
        this.Comments = obj && obj.Comments || '';
        this.Approved = obj && obj.Approved || false;
        this.RequestDate = obj && obj.RequestDate || '';
        this.ApprovalDate = obj && obj.ApprovalDate || '';
        this.TotalDays = obj && obj.TotalDays || 0;
        this.UsedDays = obj && obj.UsedDays || 0;
        this.IsPaid = obj && obj.IsPaid || false;
        this.IsCarryOver = obj && obj.IsCarryOver || false;
        this.IsSickLeave = obj && obj.IsSickLeave || false;
        this.CreatedDate = obj && obj.CreatedDate || '';
    }
}