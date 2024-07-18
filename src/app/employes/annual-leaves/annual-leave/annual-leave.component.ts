import { Component, inject } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { AnnualleaveService } from '../annualleave.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../../employe/employe.service';

@Component({
  selector: 'app-annual-leave',
  templateUrl: './annual-leave.component.html',
  styleUrls: ['./annual-leave.component.css']
})
export class AnnualLeaveComponent {

  annualLeavesService: AnnualleaveService = inject(AnnualleaveService);
  annualleaves: Observable<AnnualLeave[]> = this.annualLeavesService.getAllAnnualLeave();
  employeService: EmployeService = inject(EmployeService);
  router: Router = inject(Router);
  currentEmployeIdValue: string = '';
  
  employes: Observable<Employe[]> = this.employeService.getEmployesForSelect();
  annualLeaveForm: FormGroup;
  private destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.annualLeaveForm = this.fb.group({
      employeId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
      comments: ['', Validators.required],
      approved: [false, Validators.required],
      requestDate: ['', Validators.required],
      approvalDate: ['', Validators.required],
      totalDays: [0, Validators.required],
      usedDays: [0, Validators.required],
      isPaid: [false, Validators.required],
      isCarryOver: [false, Validators.required],
      isSickLeave: [false, Validators.required],
      //createdByUserId: [''],
      // createdDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy)).subscribe((params) => {
      const employeId = params.get('employeId');
      const salaryId = params.get('id');
      if (employeId) {
        this.annualLeaveForm.patchValue({ employeId: employeId });
        this.employeService.getEmploye(employeId).pipe(takeUntil(this.destroy)).subscribe(employe => {
          this.currentEmployeIdValue = employeId;
          console.log(employe);
          this.annualLeaveForm.get('employeId')?.disable();
          // this.isEditing = false;
        });
      }
      // else if (salaryId) {
      //   this.isEditing = true;
      //   this.employeSalaryID = salaryId;
      //   this.employeSalaryService.getEmployeSalaryById(salaryId).pipe(takeUntil(this.destroy)).subscribe(salary => {
      //     this.employeSalaryForm.patchValue(salary);
      //     this.currentEmployeIdValue = this.employeSalaryForm.get('employeId')?.value;
      //     this.employeSalaryForm.get('employeId')?.disable();
      //     console.log(this.currentEmployeIdValue);
      //   });
      // }
    });
  }

  onSubmit(): void {
    if (this.annualLeaveForm.valid) {
      let newAnnualLeave: AnnualLeave = this.annualLeaveForm.value;
      console.log(newAnnualLeave);
      console.log(this.currentEmployeIdValue);
      if(this.currentEmployeIdValue !== "") {
        newAnnualLeave = {
          ...newAnnualLeave,
          employeId: this.currentEmployeIdValue
        }
      } else {
        newAnnualLeave = {
          ...newAnnualLeave,
          //employeId: this.currentEmployeIdValue
        }
      }
     
      this.annualLeavesService.addAnnualLeave(newAnnualLeave).subscribe({
        next: (al) => console.log(al),
        error: (err) => console.error('Error:', err)
      });
    }
  }
}
