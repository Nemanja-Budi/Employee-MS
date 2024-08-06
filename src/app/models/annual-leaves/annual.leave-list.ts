import { AnnualLeave } from "./annual.leave.model";

export interface AnnualLeaveList {
    totalCount: number;
    annualLeaves: AnnualLeave[];
}