import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-employe-add',
  templateUrl: './employe-add.component.html',
  styleUrls: ['./employe-add.component.css']
})
export class EmployeAddComponent {

  employeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nameOfParent: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      hourlyRate: ['', [Validators.required, Validators.min(0)]],
      gender: ['', [Validators.required, Validators.pattern(/^[MF]$/)]],
      identityCardNumber: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      placeOfBirth: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
      pio: ['', Validators.required],
      school: [''],
      college: [''],
      position: ['', Validators.required],
      employmentContract: ['', Validators.required],
      amendmentContract: ['', Validators.required],
      bankName: ['', Validators.required],
      currentAccount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      employeChild: this.fb.array([])
    });
  }

  ngOnInit(): void {
    // Inicijalizacija ili učitavanje podataka ako je potrebno
  }

  get employeChild(): FormArray {
    return this.employeForm.get('employeChild') as FormArray;
  }

  addEmployeChild(): void {
    this.employeChild.push(this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      gender: ['', [Validators.required, Validators.pattern(/^[MF]$/)]]
    }));
  }

  removeEmployeChild(index: number): void {
    this.employeChild.removeAt(index);
  }

  onSubmit(): void {
    if (this.employeForm.valid) {
      console.log(this.employeForm.value);
      // slanje podataka na server ili druga akcija
    } else {
      console.log('Forma nije validna');
    }
  }
}
