import { Component, inject, Input } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BankService } from 'src/app/banks/bank.service';
import { EmployeBank } from 'src/app/models/bank/employe.bank.model';

@Component({
  selector: 'app-banks-for-employe',
  templateUrl: './banks-for-employe.component.html',
  styleUrls: ['./banks-for-employe.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class BanksForEmployeComponent {

  @Input() label: string = '';
  @Input() controlName: string = '';

  banks: Observable<EmployeBank[]>;

  compareFn = (option: EmployeBank, value: EmployeBank) => {
    return option && value ? option.id === value.id : option === value;
  };

  constructor(private bankService: BankService, private controlContainer: ControlContainer) {
    this.banks = this.bankService.getBanksForEmployes();
  }
  
  get parentFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
}
