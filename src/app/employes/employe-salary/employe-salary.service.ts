import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { Employe } from 'src/app/models/employe/employe.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeSalaryService {

  employeSubject: BehaviorSubject<Employe | null> = new BehaviorSubject<Employe | null>(null);

  constructor(private http: HttpClient) { }


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

  updateEmployeSalary(employeSalary: EmployeSalary): Observable<EmployeSalary> {
    return this.http.put<EmployeSalary>(`http://localhost:5000/api/employesalary/update-employe-salary`, employeSalary);
  }

  private apiUrl = 'http://localhost:5000/api/pdf/generate'; // URL vašeg API endpoint-a

  generatePdf(htmlContent: string): Observable<Blob> {
    return this.http.post(this.apiUrl, { HtmlContent: htmlContent }, { responseType: 'blob' });
  }
}
