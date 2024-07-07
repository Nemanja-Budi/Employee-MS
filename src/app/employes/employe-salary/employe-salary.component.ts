import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeService } from 'src/app/employe.service';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';

@Component({
  selector: 'app-employe-salary',
  templateUrl: './employe-salary.component.html',
  styleUrls: ['./employe-salary.component.css']
})
export class EmployeSalaryComponent {

  employeService: EmployeService = inject(EmployeService);
  

  employeSalary: Observable<EmployeSalary[]> = this.employeService.getEmployeSalarys();
}
