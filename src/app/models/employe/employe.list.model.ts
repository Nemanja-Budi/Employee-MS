import { Employe } from "src/app/models/employe/employe.model";

export interface EmployeList {
    totalCount: number;
    employes: Employe[];
}