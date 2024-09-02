import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank/bank.model';
import { BankService } from './bank.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent {

  bankService: BankService = inject(BankService);

  banks: Observable<Bank[]> = this.bankService.getAllBanks();

  showDetails: boolean = false;
  showDelete: boolean = false;
  currentBank!: Bank;
  selectedBankControl = new FormControl(null);

  // @ViewChild('bankAction', { static: true }) bankAction!: ElementRef<HTMLDialogElement>;
  @ViewChild('deleteBank', { static: true }) deleteBank!: ElementRef<HTMLDialogElement>;

  refres(event: boolean): void {
    if(event == true) {
      this.banks = this.bankService.getAllBanks();
      this.showDetails = false;
    }
  }

  onConfirm(): void {
    if(!this.currentBank) return;
    this.bankService.deleteBank(this.currentBank.id).subscribe({
      next: (response) => {
        this.deleteBank.nativeElement.close();
        this.bankService.editBank.next(null);
        console.log(response)
      }
    });
  }

  onCloseDeleteModal(): void {
    this.deleteBank.nativeElement.close();
    this.onCloseModals();
  }

  onCloseModals(): void {
    this.bankService.editBank.next(null);
    // this.bankAction.nativeElement.close();
  }

  getCurrentBank(bank: Bank): void {
    this.bankService.editBank.next(bank);
    this.currentBank = bank;
    this.showDetails = true;
    this.showDelete = false;

  }

  prikaziListuZaBrisanje(): void {
    this.showDetails = false;
    this.bankService.editBank.next(null);
    this.showDelete = !this.showDelete;
  }

  prikaziDetalje(): void {
    this.showDetails = !this.showDetails;
  }
}
