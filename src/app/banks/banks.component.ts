import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank/bank.model';
import { BankService } from './bank.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent {

  bankService: BankService = inject(BankService);

  banks: Observable<Bank[]> = this.bankService.getAllBanks();

  showDetails: boolean = false;

  prikaziDetalje(): void {
    this.showDetails = !this.showDetails;
  }
}
