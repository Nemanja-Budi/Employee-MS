import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concatMap, forkJoin, from, map, of, switchMap } from 'rxjs';

import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { EmployeSalaryService } from '../employe-salary.service';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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
  router: Router = inject(Router);
  htmlContent: string = '<h1>Sample HTML content</h1>';
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

  constructor() {
    
  }

  onChangeSelect(changeSelectSalary: string): void {
    this.router.navigate([`/employes/salary/detail-salary/${changeSelectSalary}`])
    console.log("**********************************************************************");
    console.log(this.employeSalaryId)
    console.log("**********************************************************************");

    // console.log(changeSelectSalary);
  }

  getKeysWithoutFirstAndLast(obj: any): string[] {
    const keys = Object.keys(obj);
    return keys.slice(1, keys.length - 1);
  }
  
  generatePdf(pdfElement: HTMLElement) {
    // const pdfElement = document.getElementById('pdf-content');
    if (pdfElement) {
      // Preuzmi HTML sadržaj iz elementa
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


  formatKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1') // Razdvoji reči
              .replace(/^./, (str) => str.toUpperCase()) // Prvo slovo veliko
              .replace(/\b\w+\b/g, (word, index) => index === 0 ? word : word.toLowerCase()) // Samo prva reč veliko slovo
              .trim(); // Ukloni vodeće i prateće praznine
  }
}
