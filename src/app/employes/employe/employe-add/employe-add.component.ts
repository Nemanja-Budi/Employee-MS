import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmployeService } from 'src/app/employe.service';
import { Employe } from 'src/app/models/employe.model';

@Component({
  selector: 'app-employe-add',
  templateUrl: './employe-add.component.html',
  styleUrls: ['./employe-add.component.css']
})
export class EmployeAddComponent {

  employeForm: FormGroup;
  employeService: EmployeService = inject(EmployeService);

  constructor(private fb: FormBuilder) {
    this.employeForm = this.fb.group({
      id: [undefined],
      firstName: ['Pera', Validators.required],
      lastName: ['Peric', Validators.required],
      nameOfParent: ['Jova', Validators.required],
      dateOfBirth: ['2010-02-11', Validators.required],
      jmbg: ['1234567890111', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      hourlyRate: [454.20, [Validators.required, Validators.min(0)]],
      gender: ['M', [Validators.required, Validators.pattern(/^[MF]$/)]],
      identityCardNumber: ['1234567890', Validators.required],
      phone: ['123456789', Validators.required],
      address: ['123 Main St, City', Validators.required],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      placeOfBirth: ['City', Validators.required],
      dateOfEmployment: ['2020-01-01', Validators.required],
      pio: [1234567890, [Validators.required, Validators.pattern(/^\d+$/)]],
      school: [undefined],
      college: [undefined],
      position: ['Developer', Validators.required],
      employmentContract: ['Contract1', Validators.required],
      amendmentContract: ['Amendment1', Validators.required],
      bankName: ['Bank Name', Validators.required],
      currentAccount: [345343211, [Validators.required]],
      employeChild: this.fb.array([])
    });
  }

  onSubmit(): void {
    if (this.employeForm.valid) {
      console.log(this.employeForm.value);
      const employeToAdd: Employe = {
        //id: undefined,
        firstName: this.employeForm.value['firstName'],
        lastName: this.employeForm.value['lastName'],
        nameOfParent: this.employeForm.value['nameOfParent'],
        dateOfBirth: this.employeForm.value['dateOfBirth'],
        jmbg: this.employeForm.value['jmbg'],
        hourlyRate: this.employeForm.value['hourlyRate'],
        gender: this.employeForm.value['gender'],
        identityCardNumber: this.employeForm.value['identityCardNumber'],
        phone: this.employeForm.value['phone'],
        address: this.employeForm.value['address'],
        email: this.employeForm.value['email'],
        placeOfBirth: this.employeForm.value['placeOfBirth'],
        dateOfEmployment: this.employeForm.value['dateOfEmployment'],
        pio: this.employeForm.value['pio'],
        school: this.employeForm.value['school'],
        college: this.employeForm.value['college'],
        position: this.employeForm.value['position'],
        employmentContract: this.employeForm.value['employmentContract'],
        amendmentContract: this.employeForm.value['amendmentContract'],
        bankName: this.employeForm.value['bankName'],
        currentAccount: this.employeForm.value['currentAccount'],
        employeChild: this.employeForm.value['employeChild']
      }
      this.employeService.addEmploye(employeToAdd).subscribe({
        next: (employe) => console.log(employe),
        error: () => console.log("Error")
      });
    } else {
      console.log('Forma nije validna');
    }
  }

  ngOnInit(): void {
    // Inicijalizacija ili učitavanje podataka ako je potrebno
  }

  get employeChild(): FormArray {
    return this.employeForm.get('employeChild') as FormArray;
  }

  addEmployeChild(): void {
    this.employeChild.push(this.fb.group({
      //id: [undefined],
      name: ['Mika', Validators.required],
      jmbg: ['1234567890123', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      gender: ['F', [Validators.required, Validators.pattern(/^[MF]$/)]]
    }));
  }

  removeEmployeChild(index: number): void {
    this.employeChild.removeAt(index);
  }

  
}
