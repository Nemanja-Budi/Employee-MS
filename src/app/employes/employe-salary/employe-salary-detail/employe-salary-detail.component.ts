import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap } from 'rxjs';

import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { EmployeSalaryService } from '../employe-salary.service';

@Component({
  selector: 'app-employe-salary-detail',
  templateUrl: './employe-salary-detail.component.html',
  styleUrls: ['./employe-salary-detail.component.css']
})
export class EmployeSalaryDetailComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  employeSalary: Observable<EmployeSalary> = this.activatedRoute.paramMap.pipe(concatMap((param) => {
    const id = param.get('id');
    return this.employeSalaryService.getEmployeSalaryById(String(id));
  }));

  keys(obj: any): Array<string> {
    return Object.keys(obj);
  }

  formatKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1') // Razdvoji reči
              .replace(/^./, (str) => str.toUpperCase()) // Prvo slovo veliko
              .replace(/\b\w+\b/g, (word, index) => index === 0 ? word : word.toLowerCase()) // Samo prva reč veliko slovo
              .trim(); // Ukloni vodeće i prateće praznine
  }
}
