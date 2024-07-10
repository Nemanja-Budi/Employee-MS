import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeService } from 'src/app/employe.service';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { Employe } from 'src/app/models/employe.model';

@Component({
  selector: 'app-employe-salary-add',
  templateUrl: './employe-salary-add.component.html',
  styleUrls: ['./employe-salary-add.component.css']
})
export class EmployeSalaryAddComponent {

  employeSalaryForm: FormGroup;
  employeService: EmployeService = inject(EmployeService);
  employes: Observable<Employe[]> = this.employeService.getEmployes();
  isEditing: boolean = false;
  employeSalaryID: string | undefined = undefined;
  currentEmployeIdValue: string = '';

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
      damageCompensation: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      const employeId = params.get('employeId');
      const salaryId = params.get('id');
      if (employeId) {
        this.employeSalaryForm.patchValue({ employeId: employeId });
        this.employeService.getEmploye(employeId).subscribe(employe => {
          this.currentEmployeIdValue = employeId;
          this.employeSalaryForm.get('employeId')?.disable();
          this.isEditing = false;
        });
      }
      else if (salaryId) {
        this.isEditing = true;
        this.employeSalaryID = salaryId;
        this.employeService.getEmployeSalaryById(salaryId).subscribe(salary => {
          this.employeSalaryForm.patchValue(salary);
          this.currentEmployeIdValue = this.employeSalaryForm.get('employeId')?.value;
          this.employeSalaryForm.get('employeId')?.disable();
          //this.employeSalaryForm.get('employeId')?.setValue(currentEmployeIdValue);
          console.log(this.currentEmployeIdValue);
        });
      }
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
        this.employeService.updateEmployeSalary(employeSalary).subscribe({
          next: (salary) => console.log(salary),
          error: () => console.log("Error")
        });
      }
      else if(this.isEditing == false) {
        
        console.log("add mode");
        
        if(this.currentEmployeIdValue !== "") {
          employeSalary = {
            ...employeSalary,
            employeId: this.currentEmployeIdValue
          };
        }

        this.employeService.createEmployeSalary(employeSalary).subscribe({
          next: (employe) => console.log(employe),
          error: () => console.log("Error")
        });
      }
  }
}
