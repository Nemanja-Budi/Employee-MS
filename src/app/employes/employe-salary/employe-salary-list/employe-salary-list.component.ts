import { Component, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { EmployeSalaryService } from '../employe-salary.service';


@Component({
  selector: 'app-employe-salary-list',
  templateUrl: './employe-salary-list.component.html',
  styleUrls: ['./employe-salary-list.component.css']
})
export class EmployeSalaryListComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  employeSalary: Observable<EmployeSalary[]> = this.employeSalaryService.getEmployeSalarys();

  onChangeSelect(changeSelect: string): void {
   this.employeSalaryService.getEmployeSalarysByEmployeId(changeSelect).subscribe({
    next: (employe) => this.employeSalary = of(employe)
   });
  }
}
