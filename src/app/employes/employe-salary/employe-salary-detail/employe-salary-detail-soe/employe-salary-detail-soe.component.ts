import { Component, inject, Input } from '@angular/core';
import { EmployeSalarySOE } from 'src/app/models/employe-salary/employe.salarySOE.model';
import { EmployeSalaryService } from '../../employe-salary.service';

@Component({
  selector: 'app-employe-salary-detail-soe',
  templateUrl: './employe-salary-detail-soe.component.html',
  styleUrls: ['./employe-salary-detail-soe.component.css']
})
export class EmployeSalaryDetailSoeComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);

  @Input({required: true}) employeSalarySOE!: EmployeSalarySOE;

  onGetKeysWithoutFirstAndLast(obj: any): string[] {
    return this.employeSalaryService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.employeSalaryService.formatKey(key);
  }
}
