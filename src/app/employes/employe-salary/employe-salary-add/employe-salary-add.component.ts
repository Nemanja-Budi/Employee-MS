import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { EmployeService } from 'src/app/employes/employe/employe.service';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { EmployeSalaryService } from '../employe-salary.service';
import { Employe } from 'src/app/models/employe/employe.model';

@Component({
  selector: 'app-employe-salary-add',
  templateUrl: './employe-salary-add.component.html',
  styleUrls: ['./employe-salary-add.component.css']
})
export class EmployeSalaryAddComponent implements OnInit, OnDestroy {

  employeService: EmployeService = inject(EmployeService);
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  router: Router = inject(Router);
  
  employes: Observable<Employe[]> = this.employeService.getEmployes().pipe(map((employe) => employe.employes));
  
  employeSalaryForm: FormGroup;
  isEditing: boolean = false;
  employeSalaryID: string | undefined = undefined;
  currentEmployeIdValue: string = '';
  
  private destroy = new Subject<void>();

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.employeSalaryForm = this.fb.group({
      employeId: ['', Validators.required],
      totalNumberOfHours: [null, [Validators.required, Validators.min(0)]],
      totalNumberOfWorkingHours: [null, [Validators.required, Validators.min(0)]],
      sickness100: [0, [Validators.required, Validators.min(0)]],
      sickness60: [0, [Validators.required, Validators.min(0)]],
      hoursOfAnnualVacation: [0, [Validators.required, Validators.min(0)]],
      workingHoursForTheHoliday: [0, [Validators.required, Validators.min(0)]],
      overtimeHours: [0, [Validators.required, Validators.min(0)]],
      credits: [0, [Validators.required, Validators.min(0)]],
      damageCompensation: [0, [Validators.required, Validators.min(0)]],
      calculationMonth: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (!this.employeSalaryForm.valid) return;
    let employeSalary: EmployeSalary = this.employeSalaryForm.value;

    if(this.isEditing == true) {
      console.log("edit mode");
      employeSalary = {
        ...employeSalary,
        id: this.employeSalaryID,
        employeId: this.currentEmployeIdValue
      };
      this.employeSalaryService.updateEmployeSalary(employeSalary).pipe(takeUntil(this.destroy)).subscribe({
        next: (salary) => this.router.navigate([`/employes/salary/detail-salary/${salary.id}`]),
        error: () => console.log("Error")
      });
    } else if(this.isEditing == false) {
      console.log("add mode");
      if(this.currentEmployeIdValue !== "") {
        employeSalary = {
          ...employeSalary,
          employeId: this.currentEmployeIdValue
        };
      }
      this.employeSalaryService.createEmployeSalary(employeSalary).pipe(takeUntil(this.destroy)).subscribe({
        next: (salary) => this.router.navigate([`/employes/salary/detail-salary/${salary.id}`]),
        error: () => console.log("Error")
      });
    }
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      const employeId = params.get('employeId');
      const salaryId = params.get('id');
      if (employeId) {
        this.employeSalaryForm.patchValue({ employeId: employeId });
        this.employeService.getEmploye(employeId).pipe(takeUntil(this.destroy)).subscribe(employe => {
          this.currentEmployeIdValue = employeId;
          console.log(employe);
          this.employeSalaryForm.get('employeId')?.disable();
          this.isEditing = false;
        });
      }
      else if (salaryId) {
        this.isEditing = true;
        this.employeSalaryID = salaryId;
        this.employeSalaryService.getEmployeSalaryById(salaryId).pipe(takeUntil(this.destroy)).subscribe(salary => {
          this.employeSalaryForm.patchValue(salary);
          this.currentEmployeIdValue = this.employeSalaryForm.get('employeId')?.value;
          this.employeSalaryForm.get('employeId')?.disable();
          console.log(this.currentEmployeIdValue);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
 
}
