import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BankService } from '../bank.service';
import { Bank } from 'src/app/models/bank/bank.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bank-add',
  templateUrl: './bank-add.component.html',
  styleUrls: ['./bank-add.component.css']
})
export class BankAddComponent implements OnInit, OnDestroy {

  bankService: BankService = inject(BankService);
  private destroy$ = new Subject<void>();
  
  isEdit: boolean = false;
  bankForm: FormGroup;
  currentBankId: string = '';

  @Output() acctionEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {
    this.bankForm = this.fb.group({
      bankName: ['', [Validators.required]],
      bankEmail: ['', [Validators.required, Validators.email]],
      bankAccount: ['', [Validators.required]]
    });
  }


  onSubmit(): void {
    if (!this.bankForm.valid) return;
    
    const bank: Bank = {
      ...this.bankForm.value
    }

    if(this.isEdit) {
      const bankForEdit = {
        ...bank,
        id: this.currentBankId
      }
      this.editBank(bankForEdit);
    } else {
      this.addBank(bank);
    }
  }

  private addBank(bankForAdd: Bank): void {
    this.bankService.addBank(bankForAdd).pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        this.acctionEvent.emit(true);
      },
      error:(e) => console.error(e)
    });
  }

  private editBank(bankForEdit: Bank): void {
    this.bankService.editsBank(bankForEdit).pipe(takeUntil(this.destroy$)).subscribe({
      next:(response) => {
        this.acctionEvent.emit(true);
        this.bankService.editBank.next(null);
      },
      error:(e) => console.error(e)
    });
  }

  ngOnInit(): void {
    this.bankService.editBank
      .pipe(takeUntil(this.destroy$))
      .subscribe(bank => {
        if (bank !== null) {
          this.isEdit = true;
          this.currentBankId = bank.id;
          this.bankForm.patchValue(bank);
          console.log(bank);
        } else {
          this.isEdit = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
