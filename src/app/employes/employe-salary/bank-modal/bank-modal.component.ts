import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { EmployeSalaryService } from '../employe-salary.service';
import { SharedService } from 'src/app/shared/shared.service';
import { forkJoin } from 'rxjs';
import { CustomBank } from '../types/employe.salary.types';

@Component({
  selector: 'app-bank-modal',
  templateUrl: './bank-modal.component.html',
  styleUrls: ['./bank-modal.component.css']
})
export class BankModalComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  sharedService: SharedService = inject(SharedService);
  
  platePoBankama:CustomBank[] = [];
  nazivPdfa: string = '';
  month: number = 1;
  year: number = 1;
  total: number = 0;

  @ViewChild('netoSalary', { static: true }) netoSalary!: ElementRef<HTMLDialogElement>;
  @ViewChild('bankModal', { static: true }) bankModal!: ElementRef<HTMLDialogElement>;
  
  ngOnInit(): void {
    if(this.employeSalaryService.isModalOpen.value === true) {
      this.bankModal.nativeElement.showModal();
    } else {
      this.bankModal.nativeElement.close();
    }
  }

  onConfirm(): void {
    if(this.month === 1 && this.year === 1) return;
    forkJoin([
      this.employeSalaryService.getSalariesByBank(this.month, this.year),
      this.employeSalaryService.getTotalSalariesByBanks(this.month, this.year)
    ]).subscribe({
      next: ([plate, total]) => {
        this.platePoBankama = plate;
        this.total = total;
        this.bankModal.nativeElement.close();
        this.netoSalary.nativeElement.showModal();
      },
      error: (e) => console.error(e)
    });
  }

  getDate(dateInput: string): void {
    let splitDate = dateInput.split("-");
    this.year = Number(splitDate[0]);
    this.month = Number(splitDate[1]);
    this.cratePdfName(this.year, this.month);
  }

  cratePdfName(year: number, month: number): void {
    const months = this.sharedService.getMonths();
    if (month >= 1 && month <= 12) {
      const mesec = months[month - 1];
      this.nazivPdfa = `plata-${mesec}-${year}.pdf`;
      console.log(this.nazivPdfa);
    } else {
      throw new Error("Nepoznat mesec");
    }
  }

  onCloseNetoSalaryModal(wrongDate?: boolean): void {
    if(wrongDate == true) {
      this.bankModal.nativeElement.showModal();
    } else {
      this.employeSalaryService.isModalOpen.next(false);
    }
    this.netoSalary.nativeElement.close();
  }

  onCloseModal(): void {
    this.employeSalaryService.isModalOpen.next(false);
  }
}
