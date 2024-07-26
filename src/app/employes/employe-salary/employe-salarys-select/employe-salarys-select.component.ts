import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';

@Component({
  selector: 'app-employe-salarys-select',
  templateUrl: './employe-salarys-select.component.html',
  styleUrls: ['./employe-salarys-select.component.css']
})
export class EmployeSalarysSelectComponent {

  router: Router = inject(Router);
  @Input({required: true}) employeSalarys: EmployeSalary[] = [];
  @Input({required: true}) employeSalaryId: string | undefined = '';

  onChangeSelect(changeSelectSalary: string): void {
    this.router.navigate([`/employes/salary/detail-salary/${changeSelectSalary}`])
    console.log(this.employeSalaryId)
  }

}
