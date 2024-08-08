import { Component, inject, Input } from '@angular/core';
import { IncomeFromWork } from 'src/app/models/employe-salary/income.from.work.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employe-salary-detail-ifw',
  templateUrl: './employe-salary-detail-ifw.component.html',
  styleUrls: ['./employe-salary-detail-ifw.component.css']
})
export class EmployeSalaryDetailIfwComponent {
  sharedService: SharedService = inject(SharedService);

  @Input({required: true}) incomeFromWork!: IncomeFromWork;
  @Input({required: true}) showClass: boolean = false;

  onGetKeysWithoutFirstAndLast(obj: any): string[] {
    return this.sharedService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.sharedService.formatKey(key);
  }
}
