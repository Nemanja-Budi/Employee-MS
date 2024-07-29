import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuditlogService } from './auditlog.service';
import { AuditlogDto } from 'src/app/models/dto/auditlogDto';

@Component({
  selector: 'app-auditlogs',
  templateUrl: './auditlogs.component.html',
  styleUrls: ['./auditlogs.component.css']
})
export class AuditlogsComponent {

  auditLogService: AuditlogService = inject(AuditlogService);
  employeAuditLogs: Observable<AuditlogDto[]> = this.auditLogService.getAuditLogs(); 

  keys<T>(obj: T | undefined): Array<keyof T> {
    return obj ? (Object.keys(obj) as Array<keyof T>) : [];
  }

  formatKey(key: string): string {
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
}
