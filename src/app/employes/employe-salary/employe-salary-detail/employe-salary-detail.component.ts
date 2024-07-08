import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap } from 'rxjs';
import { EmployeService } from 'src/app/employe.service';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';

@Component({
  selector: 'app-employe-salary-detail',
  templateUrl: './employe-salary-detail.component.html',
  styleUrls: ['./employe-salary-detail.component.css']
})
export class EmployeSalaryDetailComponent {

  employeService: EmployeService = inject(EmployeService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  employeSalary: Observable<EmployeSalary> = this.activatedRoute.paramMap.pipe(concatMap((param) => {
    const id = param.get('id');
    return this.employeService.getEmployeSalaryById(String(id));
  }));
}
