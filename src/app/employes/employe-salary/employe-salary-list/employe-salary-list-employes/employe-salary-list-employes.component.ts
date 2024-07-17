import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeService } from 'src/app/employes/employe/employe.service';
import { Employe } from 'src/app/models/employe/employe.model';

@Component({
  selector: 'app-employe-salary-list-employes',
  templateUrl: './employe-salary-list-employes.component.html',
  styleUrls: ['./employe-salary-list-employes.component.css']
})
export class EmployeSalaryListEmployesComponent implements OnInit {

  @Input({required: true}) employeId: string = '';
  @Input() isDetail: boolean = false;
  employe$: Observable<Employe> | undefined;

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {
    if (this.employeId) {
      this.employe$ = this.employeService.getEmploye(this.employeId);
    }
  }
}
