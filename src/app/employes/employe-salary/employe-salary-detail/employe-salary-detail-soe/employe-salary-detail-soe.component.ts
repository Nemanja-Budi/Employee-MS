import { Component, inject, Input } from '@angular/core';
import { EmployeSalarySOE } from 'src/app/models/employe-salary/employe.salarySOE.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employe-salary-detail-soe',
  templateUrl: './employe-salary-detail-soe.component.html',
  styleUrls: ['./employe-salary-detail-soe.component.css']
})
export class EmployeSalaryDetailSoeComponent {

  sharedService: SharedService = inject(SharedService);

  @Input({required: true}) employeSalarySOE!: EmployeSalarySOE;

  onGetKeysWithoutFirstAndLast(obj: any): string[] {
    return this.sharedService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.sharedService.formatKey(key);
  }
}
