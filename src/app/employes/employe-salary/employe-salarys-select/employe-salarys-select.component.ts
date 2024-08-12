import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employe-salarys-select',
  templateUrl: './employe-salarys-select.component.html',
  styleUrls: ['./employe-salarys-select.component.css']
})
export class EmployeSalarysSelectComponent implements OnInit {

  sharedService: SharedService= inject(SharedService);
  router: Router = inject(Router);

  @Input({required: true}) employeSalarys: EmployeSalary[] = [];
  @Input({required: true}) employeSalaryId: string | undefined = '';
  @Input({required: true}) calculationMonth!: Date;
  @Input() fullName: string = '';
  
  onChangeSelect(changeSelectSalary: string): void {
    this.router.navigate([`/employes/salary/detail-salary/${changeSelectSalary}`]);    
  }

  ngOnInit(): void {
    this.sharedService.updatePdf();
  }

}
