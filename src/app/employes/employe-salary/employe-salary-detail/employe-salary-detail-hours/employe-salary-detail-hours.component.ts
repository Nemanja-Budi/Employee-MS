import { Component, Input } from '@angular/core';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';

@Component({
  selector: 'app-employe-salary-detail-hours',
  templateUrl: './employe-salary-detail-hours.component.html',
  styleUrls: ['./employe-salary-detail-hours.component.css']
})
export class EmployeSalaryDetailHoursComponent {

  @Input({required: true}) employeSalaryData!: EmployeSalary;
}
