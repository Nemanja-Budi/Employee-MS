import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, of, Subscription, Subject, takeUntil } from 'rxjs';
import { EmployeService } from 'src/app/employes/employe/employe.service';
import { EmployeChild } from 'src/app/models/employe/employe.child.model';
import { Employe } from 'src/app/models/employe/employe.model'; 

@Component({
  selector: 'app-employe-add',
  templateUrl: './employe-add.component.html',
  styleUrls: ['./employe-add.component.css']
})
export class EmployeAddComponent implements OnInit, OnDestroy {

  employeService: EmployeService = inject(EmployeService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  employeForm: FormGroup;
  employe: Employe | null = null;
  private destroy = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.employeForm = this.createEmployeForm();
  }

  createEmployeForm(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      nameOfParent: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      hourlyRate: [0, [Validators.required, Validators.min(0)]],
      gender: ['', [Validators.required, Validators.pattern(/^[MF]$/)]],
      identityCardNumber: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      placeOfBirth: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
      pio: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      school: [undefined],
      college: [undefined],
      position: ['', Validators.required],
      employmentContract: ['', Validators.required],
      amendmentContract: ['', Validators.required],
      bankName: ['', Validators.required],
      currentAccount: [null, [Validators.required]],
      employeChild: this.fb.array([])
    });
  }

  populateEmployeForm(employe: Employe): void {
    this.employeForm.patchValue(employe);
    const employeChildArray = this.employeForm.get('employeChild') as FormArray;
    employeChildArray.clear();
    if (employe.employeChild && employe.employeChild.length) {
      employe.employeChild.forEach(child => {
        employeChildArray.push(this.fb.group({
          name: [child.name, Validators.required],
          jmbg: [child.jmbg, [Validators.required, Validators.pattern(/^\d{13}$/)]],
          gender: [child.gender, [Validators.required, Validators.pattern(/^[MF]$/)]]
        }));
      });
    }
  }
  
  onSubmit(): void {
    if (!this.employeForm.valid) {
      this.employeForm.markAllAsTouched(); // Obeleži sva polja kao touched
      return;
    }
    
    const employeToSave: Employe = this.employeForm.value;

    if (this.employe) {
      const employeToEdit: Employe = {
        ...employeToSave,
        id: this.employe.id,
        employeChild: this.employeForm.value.employeChild.map((child: EmployeChild, index: number) => ({
          ...child,
          id: this.employe!.employeChild && this.employe!.employeChild[index] ? this.employe!.employeChild[index].id || undefined : undefined
        }))
      };
      console.log(employeToEdit);
      this.employeService.updateEmploye(this.employe.id!, employeToEdit)
      .pipe(
        takeUntil(this.destroy))
      .subscribe({
        next: (employe) => this.router.navigate([`/employes/employe/detail-employe/${employe.id}`]),
        error: () => console.log("Error")
      });
    } else {
      console.log(employeToSave);
      this.employeService.addEmploye(employeToSave)
      .pipe(
        takeUntil(this.destroy))
      .subscribe({
        next: (employe) => this.router.navigate([`/employes/employe/detail-employe/${employe.id}`]),
        error: () => console.log("Error")
      });
    }
  }

  get employeChild(): FormArray {
    return this.employeForm.get('employeChild') as FormArray;
  }

  addEmployeChild(): void {
    this.employeChild.push(this.fb.group({
      name: ['', Validators.required],
      jmbg: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      gender: ['', [Validators.required, Validators.pattern(/^[MF]$/)]]
    }));
  }

  removeEmployeChild(index: number): void {
    this.employeChild.removeAt(index);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(
      switchMap(paramMap => {
        const id = paramMap.get('id');
        if (id) {
          return this.employeService.getEmploye(id);
        }
        return of(null);
      }),
      takeUntil(this.destroy))
    .subscribe((employe: Employe | null) => {
      if (employe) {
        this.employe = employe;
        this.populateEmployeForm(employe);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
