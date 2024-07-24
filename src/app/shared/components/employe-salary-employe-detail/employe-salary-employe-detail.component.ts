import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeSalaryService } from 'src/app/employes/employe-salary/employe-salary.service';
import { EmployeService } from 'src/app/employes/employe/employe.service';
import { Employe } from 'src/app/models/employe/employe.model';

@Component({
  selector: 'app-employe-salary-employe-detail',
  templateUrl: './employe-salary-employe-detail.component.html',
  styleUrls: ['./employe-salary-employe-detail.component.css']
})
export class EmployeSalaryEmployeDetailComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  employeService: EmployeService = inject(EmployeService);

  @Input() employeId: string = '';
  @Input({required: true}) isDetail: boolean = false;
  @Input({required: true}) isPdf: boolean = false;

  employe$!: Observable<Employe | null>;

  ngOnInit(): void {
    if (this.employeId) {
      this.employe$ = this.employeService.getEmploye(this.employeId);
    }
  }
}
