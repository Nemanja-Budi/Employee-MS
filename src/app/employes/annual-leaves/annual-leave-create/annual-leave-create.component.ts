import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../../employe/employe.service';
import { AnnualleaveService } from '../annualleave.service';

@Component({
  selector: 'app-annual-leave-create',
  templateUrl: './annual-leave-create.component.html',
  styleUrls: ['./annual-leave-create.component.css']
})
export class AnnualLeaveCreateComponent {

  annualLeavesService: AnnualleaveService = inject(AnnualleaveService);
  employeService: EmployeService = inject(EmployeService);
  router: Router = inject(Router);

  annualleaves: Observable<AnnualLeave[]> = this.annualLeavesService.getAllAnnualLeave().pipe(map((al) => al.annualLeaves));
  employes: Observable<Employe[]> = this.employeService.getEmployesForSelect();
  
  currentEmployeIdValue: string = '';
  alId: string = '';
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
      const annualLeaveId = params.get('annualleaveId');
      console.log(`OVO JE EMPLOYE ID ${employeId}`);
      console.log(annualLeaveId);
      if (employeId) {
        this.annualLeaveForm.patchValue({ employeId: employeId });
        this.employeService.getEmploye(employeId).pipe(takeUntil(this.destroy)).subscribe(employe => {
          this.currentEmployeIdValue = employeId;
          console.log(employe);
          this.annualLeaveForm.get('employeId')?.disable();
          // this.isEditing = false;
        });
      }
      else if (annualLeaveId) {
        //this.isEditing = true;
        //this.employeSalaryID = salaryId;
        this.alId = annualLeaveId;
        this.annualLeavesService.getAnnualLeaveById(annualLeaveId).pipe(takeUntil(this.destroy)).subscribe(al => {
          console.log(al);
          this.annualLeaveForm.patchValue(al);
          this.currentEmployeIdValue = this.annualLeaveForm.get('employeId')?.value;
          this.annualLeaveForm.get('employeId')?.disable();
          console.log(this.currentEmployeIdValue);
        });
      }
    });
  }

  onSubmit(): void {
    if (!this.annualLeaveForm.valid) {
      this.annualLeaveForm.markAllAsTouched(); // Obeleži sva polja kao touched
      return;
    }
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
      if(this.alId === '') {
        this.annualLeavesService.addAnnualLeave(newAnnualLeave).subscribe({
          next: (al) => this.router.navigate([`/employes/annual-leave/all-annual-leaves`]),
          error: (err) => console.error('Error:', err)
        });
        console.log(`KAD NEMA alID ZNACI DODAVANJE NOVOG AL ${newAnnualLeave}`);
        console.log(`NOVI GODISNJI ODMOR AL ID JE PRAZAN ${this.alId}`);
      } else if (this.alId !== '') {
        
        newAnnualLeave = {
          ...newAnnualLeave,
          annualLeaveId: this.alId
        }
        console.log(`KAD IME alID ZNACI UPDATE AL ${newAnnualLeave}`);
        console.log(newAnnualLeave);
        console.log(`UPDATE GODISNJI ODMOR AL ID NIJE PRAZAN ${this.alId}`);
        this.annualLeavesService.updateAnnualLeave(newAnnualLeave).subscribe({
          next:(al) => this.router.navigate([`/employes/annual-leave/all-annual-leaves`]),
          error:(err) => console.error(`Error`, err)
        });
      }

    }
}

