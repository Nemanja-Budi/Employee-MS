import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, concatMap, forkJoin, from, map, of, switchMap } from 'rxjs';

import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { EmployeSalaryService } from '../employe-salary.service';

import { EmployeService } from '../../employe/employe.service';
import { Employe } from 'src/app/models/employe/employe.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employe-salary-detail',
  templateUrl: './employe-salary-detail.component.html',
  styleUrls: ['./employe-salary-detail.component.css']
})
export class EmployeSalaryDetailComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  employeService: EmployeService = inject(EmployeService);
  sharedService: SharedService = inject(SharedService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  showLoading: boolean = false;
  hourlyRate: number = 0;
  employeSalarys!: Observable<EmployeSalary[]>;
  employeSalaryId: string | undefined = '';
  employe!: Employe;
  nazivPdfa: string = '';

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
          this.createPdfName(employe, salary)
          const salarys: Observable<EmployeSalary[]> = this.employeSalaryService.getEmployeSalarysByEmployeId(String(employe.id));
          this.employeSalarys = from(salarys)
          return salary;
        })
      );
    })
  );
  
  createPdfName(employe: Employe,  salary: EmployeSalary): void {
    if(employe.id === salary.employeId) {
      
      const months: string[] = this.sharedService.getMonths();
      const datum: Date = new Date(salary.calculationMonth);
      const year: number = datum.getFullYear();
      const month: number = datum.getMonth() + 1;
      
      if (month >= 1 && month <= 12) {
        const mesec = months[month - 1];
        this.nazivPdfa = `${employe.lastName} ${employe.firstName} plata ${mesec} ${year}.pdf`;
        this.sharedService.pdfName.next(this.nazivPdfa);
        console.log(this.nazivPdfa);
      } else {
        throw new Error("Nepoznat mesec");
      }
    }
  }

  onShowLoadin(eventLoading: boolean): void {
    console.log("****************************");
    console.log("event loading");
    console.log("****************************");
    this.showLoading = eventLoading;
  }
}
