import { Employe } from "src/app/models/employe.model";

export interface EmployeList {
    totalCount: number;
    employes: Employe[];
}