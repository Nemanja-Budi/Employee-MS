import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from './models/employe.model';
import { EmployeSalary } from './models/employe-salary/employe.salary.model';
import { AnnualLeave } from './models/annual-leaves/annual.leave.model';
import { AuditLog } from './models/auditlog.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  getEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`http://localhost:5000/api/employe/get-employes`);
  }

  addEmploye(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(`http://localhost:5000/api/employe/create-employe`, employe);
  }

  deleteEmploye(employeId: string): Observable<Employe> {
    return this.http.delete<Employe>(`http://localhost:5000/api/employe/delete-employe/${employeId}`);
  }

  getEmploye(employeId: string): Observable<Employe> {
    return this.http.get<Employe>(`http://localhost:5000/api/employe/get-employe/${employeId}`);
  }

  getEmployeSalarys(): Observable<EmployeSalary[]> {
    return this.http.get<EmployeSalary[]>(`http://localhost:5000/api/employesalary/employe-salarys`);
  }

  getEmployeSalarysByEmployeId(employeId: string): Observable<EmployeSalary[]> {
    return this.http.get<EmployeSalary[]>(`http://localhost:5000/api/employesalary/employe-salarys/${employeId}`);
  }

  createEmployeSalary(employeSalary: EmployeSalary): Observable<EmployeSalary> {
    return this.http.post<EmployeSalary>(`http://localhost:5000/api/employesalary/create-employe-salary`, employeSalary);
  }

  getEmployeSalaryById(employeSalaryId: string): Observable<EmployeSalary> {
    return this.http.get<EmployeSalary>(`http://localhost:5000/api/employesalary/employe-salary/${employeSalaryId}`);
  }
 
  getAllAnnualLeave(): Observable<AnnualLeave[]> {
    return this.http.get<AnnualLeave[]>(`http://localhost:5000/api/annualleave/get-annualleaves`);
  }

  getAuditLogs(): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`http://localhost:5000/api/auditlogs/get-auditlogs`);
  }
}
