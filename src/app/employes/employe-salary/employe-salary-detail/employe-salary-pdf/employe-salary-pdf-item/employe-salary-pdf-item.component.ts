import { Component, Input } from '@angular/core';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';

@Component({
  selector: 'app-employe-salary-pdf-item',
  templateUrl: './employe-salary-pdf-item.component.html',
  styleUrls: ['./employe-salary-pdf-item.component.css']
})
export class EmployeSalaryPdfItemComponent {

  @Input({required: true}) employeSalaryData!: EmployeSalary;
  @Input({required: true}) hourlyRate: number = 0;
}
