import { Component, inject } from '@angular/core';
import { EmployeSalaryService } from '../employe-salary.service';

@Component({
  selector: 'app-employe-salary-search',
  templateUrl: './employe-salary-search.component.html',
  styleUrls: ['./employe-salary-search.component.css']
})
export class EmployeSalarySearchComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);

  onGetSalaryInput(salaryInput: string): void {
    console.log(salaryInput);
    this.employeSalaryService.employeSalaryQuearyParamsSubject.next({
      ...this.employeSalaryService.employeSalaryQuearyParamsSubject.value,
      employeSalaryFilterDto: {
        firstName: salaryInput,
        lastName: this.employeSalaryService.employeSalaryQuearyParamsSubject.value.employeSalaryFilterDto.lastName,
      }
    });
  }
}
