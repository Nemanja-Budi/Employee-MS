import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, Observable } from 'rxjs';

import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { EmployeSalaryService } from '../employe-salary.service';

@Component({
  selector: 'app-employe-salary-list',
  templateUrl: './employe-salary-list.component.html',
  styleUrls: ['./employe-salary-list.component.css']
})
export class EmployeSalaryListComponent implements OnInit {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  employeSalarys: Observable<EmployeSalary[]> = this.employeSalaryService.getEmployeSalarys().pipe(map((salarys) => salarys.employeSalarys));
  selectedEmployeId: string | null = null;
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('employeId');
      if(id !== null) {
        this.selectedEmployeId = id;
        this.employeSalarys = this.employeSalaryService.getEmployeSalarysByEmployeId(this.selectedEmployeId);
        console.log(`ID JE OVDE if ${this.selectedEmployeId}`)
      } else {
        console.log(`ID JE OVDE else ${this.selectedEmployeId}`)
      }
    });
  }
}
