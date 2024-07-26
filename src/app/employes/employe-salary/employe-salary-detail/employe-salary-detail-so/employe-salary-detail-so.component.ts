import { Component, inject, Input } from '@angular/core';
import { EmployeSalarySO } from 'src/app/models/employe-salary/employe.salarySO.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employe-salary-detail-so',
  templateUrl: './employe-salary-detail-so.component.html',
  styleUrls: ['./employe-salary-detail-so.component.css']
})
export class EmployeSalaryDetailSoComponent {
  
  sharedService: SharedService = inject(SharedService);

  @Input({required: true}) employeSalarySO!: EmployeSalarySO;

  onGetKeysWithoutFirstAndLast(obj: any): string[] {
    return this.sharedService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.sharedService.formatKey(key);
  }
}
