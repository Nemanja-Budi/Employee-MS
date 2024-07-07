import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from './models/employe.model';
import { EmployeSalary } from './models/employe-salary/employe.salary.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  getEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`http://localhost:5000/api/employe/get-employes`);
  }

  getEmployeSalarys(): Observable<EmployeSalary[]> {
    return this.http.get<EmployeSalary[]>(`http://localhost:5000/api/employesalary/employe-salarys/3d509c1f-aaa1-4de6-12ae-08dc9d3e99b6`);
  }

  createEmployeSalary(employeSalary: EmployeSalary): Observable<EmployeSalary> {
    return this.http.post<EmployeSalary>(`http://localhost:5000/api/employesalary/create-employe-salary`, employeSalary);
  }

 
}
