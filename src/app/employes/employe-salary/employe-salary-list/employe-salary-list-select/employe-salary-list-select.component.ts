import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeSalaryService } from '../../employe-salary.service';
import { EmployeService } from 'src/app/employes/employe/employe.service';

@Component({
  selector: 'app-employe-salary-list-select',
  templateUrl: './employe-salary-list-select.component.html',
  styleUrls: ['./employe-salary-list-select.component.css']
})
export class EmployeSalaryListSelectComponent {

  employeService: EmployeService = inject(EmployeService);
  employes: Observable<Employe[]> = this.employeService.getEmployesForSelect();

  @Output() changeEnployeEvent: EventEmitter<string> = new EventEmitter<string>();

  onChangeSelect(changeSelect: string): void {
    this.changeEnployeEvent.emit(changeSelect);
  }
}
