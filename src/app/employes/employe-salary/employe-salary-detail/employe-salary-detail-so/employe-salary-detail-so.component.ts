import { Component, inject, Input } from '@angular/core';
import { EmployeSalarySO } from 'src/app/models/employe-salary/employe.salarySO.model';
import { EmployeSalaryService } from '../../employe-salary.service';

@Component({
  selector: 'app-employe-salary-detail-so',
  templateUrl: './employe-salary-detail-so.component.html',
  styleUrls: ['./employe-salary-detail-so.component.css']
})
export class EmployeSalaryDetailSoComponent {
  
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);

  @Input({required: true}) employeSalarySO!: EmployeSalarySO;

  onGetKeysWithoutFirstAndLast(obj: any): string[] {
    return this.employeSalaryService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.employeSalaryService.formatKey(key);
  }
}
