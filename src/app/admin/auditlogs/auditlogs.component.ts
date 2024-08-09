import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuditlogService } from './auditlog.service';
import { AuditlogDto } from 'src/app/models/dto/auditlogDto';

@Component({
  selector: 'app-auditlogs',
  templateUrl: './auditlogs.component.html',
  styleUrls: ['./auditlogs.component.css']
})
export class AuditlogsComponent implements OnDestroy {

  auditLogService: AuditlogService = inject(AuditlogService);
  employeAuditLogs: Observable<AuditlogDto[]> = this.auditLogService.getAuditLogs().pipe(map((al) => al.auditLogs)); 

  keys<T>(obj: T | undefined): Array<string> {
    return obj ? Object.keys(obj) : [];
  }

  isSpecialKey(key: string): boolean {
    const specialKeys = [
      'newEmployeDto', 'oldEmployeDto', 'newEmployeChild', 'oldEmployeChild',
      'newEmployeSalary', 'oldEmployeSalary', 'newEmployeSalarySO', 'oldEmployeSalarySO',
      'newEmployeSalarySOE', 'oldEmployeSalarySOE', 'newIncomeFromWork', 'oldIncomeFromWork',
      'newAnnualLeave','oldAnnualLeave','newUser','oldUser'
    ];
    return specialKeys.includes(key);
  }

  formatValue(key: string, value: any): any {
    if (key === 'changeDateTime') {
        return new Date(value);
    }
    return value;
}

  formatKey(key: string): string {
    if(key === 'EmployeId') {
      key = 'Employe'
    }
    return key
      .replace(/([A-Z])/g, ' $1') // Razdvoji reči
      .replace(/^./, (str) => str.toUpperCase()) // Prvo slovo veliko
      .replace(/\b\w+\b/g, (word, index) => index === 0 ? word : word.toLowerCase()) // Samo prva reč veliko slovo
      .trim(); // Ukloni vodeće i prateće praznine
  }

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  getDifference(oldData: any, newData: any): any {
    const diff: any = {};
    for (const key of this.keys(oldData)) {
      if (oldData[key] !== newData[key]) {
        diff[key] = { old: oldData[key], new: newData[key] };
      }
    }
    return diff;
  }

  ngOnDestroy(): void {
    this.auditLogService.resetFilters();
  }
}
