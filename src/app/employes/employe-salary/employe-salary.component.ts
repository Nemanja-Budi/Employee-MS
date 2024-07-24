import { Component, inject } from '@angular/core';
import { EmployeSalaryService } from './employe-salary.service';


@Component({
  selector: 'app-employe-salary',
  templateUrl: './employe-salary.component.html',
  styleUrls: ['./employe-salary.component.css']
})
export class EmployeSalaryComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  
}
