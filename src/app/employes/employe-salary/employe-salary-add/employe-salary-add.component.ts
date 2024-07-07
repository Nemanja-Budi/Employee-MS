import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
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

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.employeSalaryForm.valid) {
      const employeSalary: EmployeSalary = {
        totalNumberOfHours: this.employeSalaryForm.value["totalNumberOfHours"],
        totalNumberOfWorkingHours: this.employeSalaryForm.value["totalNumberOfWorkingHours"],
        sickness100: this.employeSalaryForm.value["sickness100"],
        sickness60: this.employeSalaryForm.value["sickness60"],
        hoursOfAnnualVacation: this.employeSalaryForm.value["hoursOfAnnualVacation"],
        workingHoursForTheHoliday: this.employeSalaryForm.value["workingHoursForTheHoliday"],
        overtimeHours: this.employeSalaryForm.value["overtimeHours"],
        credits: this.employeSalaryForm.value["credits"],
        damageCompensation: this.employeSalaryForm.value["damageCompensation"],
        employeId: this.employeSalaryForm.value["employeId"]
      };
      console.log(employeSalary);
      this.employeService.createEmployeSalary(employeSalary).subscribe({
        next: (employe) => console.log(employe),
        error: () => console.log("Erorr") 
      })
    } else {
      console.error('Form is invalid');
    }
  }
}
