import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concatMap, forkJoin, from, map, of, switchMap } from 'rxjs';

import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { EmployeSalaryService } from '../employe-salary.service';

import { EmployeService } from '../../employe/employe.service';
import { Employe } from 'src/app/models/employe/employe.model';

@Component({
  selector: 'app-employe-salary-detail',
  templateUrl: './employe-salary-detail.component.html',
  styleUrls: ['./employe-salary-detail.component.css']
})
export class EmployeSalaryDetailComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  employeService: EmployeService = inject(EmployeService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  hourlyRate: number = 0;
  employeSalarys!: Observable<EmployeSalary[]>;
  employeSalaryId: string | undefined = '';
  employe!: Employe;

  employeSalary: Observable<EmployeSalary | null> = this.activatedRoute.paramMap.pipe(
    switchMap((param) => {
      const id = param.get('id');
      if (!id) {
        throw new Error('ID not found in route parameters');
      }
      return this.employeSalaryService.getEmployeSalaryById(id).pipe(
        switchMap((salary) => 
          forkJoin([
            of(salary),
            this.employeService.getEmploye(salary.employeId)
          ])
        ),
        map(([salary, employe]) => {
          this.employeSalaryService.employeSubject.next(employe);
          this.employe = employe;
          this.hourlyRate = employe.hourlyRate;
          this.employeSalaryId = salary.id
          const salarys: Observable<EmployeSalary[]> = this.employeSalaryService.getEmployeSalarysByEmployeId(String(employe.id));
          this.employeSalarys = from(salarys)
          return salary;
        })
      );
    })
  );

  generatePdf(pdfElement: HTMLElement) {
    if (pdfElement) {
      const htmlContent = pdfElement.innerHTML;
      this.employeSalaryService.generatePdf(htmlContent).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employee-salary.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Element with id "pdf-content" not found.');
    }
  }
}
