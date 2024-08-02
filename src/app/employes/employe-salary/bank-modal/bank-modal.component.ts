import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { CustomBank, EmployeSalaryService } from '../employe-salary.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-bank-modal',
  templateUrl: './bank-modal.component.html',
  styleUrls: ['./bank-modal.component.css']
})
export class BankModalComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  sharedService: SharedService = inject(SharedService);
  platePoBankama:CustomBank[] = [];
  month: number = 1;
  year: number = 1;

  @ViewChild('netoSalary', { static: true }) netoSalary!: ElementRef<HTMLDialogElement>;
  @ViewChild('bankModal', { static: true }) bankModal!: ElementRef<HTMLDialogElement>;
  
  ngOnInit(): void {
    if(this.employeSalaryService.isModalOpen.value === true) {
      console.log("*******************************OVDE SAM IF******************");
      this.bankModal.nativeElement.showModal();
    } else {
      console.log("*******************************OVDE SAM ELSE******************");
      this.bankModal.nativeElement.close();

    }
  }

  onConfirm(): void {
    if(this.month === 1 && this.year === 1) return;
    console.log(this.month, this.year);
    this.employeSalaryService.getSalariesByBank(this.month, this.year).subscribe({
      next: (array) => {
        this.platePoBankama = array;
        this.bankModal.nativeElement.close();
        this.netoSalary.nativeElement.showModal();
      }
    });
  }

  getMesec(monthInput: string): void {
    this.month = Number(monthInput);
  }

  getYear(yearInput: string): void {
    this.year = Number(yearInput);
  }

  onCloseNetoSalaryModal(): void {
    this.employeSalaryService.isModalOpen.next(false);
    this.netoSalary.nativeElement.close();
  }

  onCloseModal(): void {
    this.employeSalaryService.isModalOpen.next(false);
    // this.bankModal.nativeElement.close();
  }
}
