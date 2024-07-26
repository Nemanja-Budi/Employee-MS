import { Component, inject, Input } from '@angular/core';
import { IncomeFromWork } from 'src/app/models/employe-salary/income.from.work.model';
import { EmployeSalaryService } from '../../employe-salary.service';

@Component({
  selector: 'app-employe-salary-detail-ifw',
  templateUrl: './employe-salary-detail-ifw.component.html',
  styleUrls: ['./employe-salary-detail-ifw.component.css']
})
export class EmployeSalaryDetailIfwComponent {
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  @Input({required: true}) incomeFromWork!: IncomeFromWork;

  onGetKeysWithoutFirstAndLast(obj: any): string[] {
    return this.employeSalaryService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.employeSalaryService.formatKey(key);
  }
}
