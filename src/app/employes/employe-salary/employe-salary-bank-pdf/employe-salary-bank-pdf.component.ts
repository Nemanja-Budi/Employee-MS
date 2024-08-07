import { Component, inject, Input, OnInit,TemplateRef, ViewChild } from '@angular/core';

import { SharedService } from 'src/app/shared/shared.service';
import { EmployeSalaryService } from '../employe-salary.service';
import { BankAccount, CustomBank } from '../types/employe.salary.types';



@Component({
  selector: 'app-employe-salary-bank-pdf',
  templateUrl: './employe-salary-bank-pdf.component.html',
  styleUrls: ['./employe-salary-bank-pdf.component.css']
})
export class EmployeSalaryBankPdfComponent implements OnInit {

  sharedService: SharedService = inject(SharedService);
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);

  bankAccounts: BankAccount[] = this.employeSalaryService.getBankAccounts();

  @Input({required: true}) bankData: CustomBank[] = [];
  @Input({required: true}) total: number = 0;
  @Input({required: true}) plateZa: string = '';
  
  @Input() show: boolean = false;
  @ViewChild('pdfBankTemplate', { static: false }) pdfBankTemplate!: TemplateRef<any>;
  
  generatePdf(): void {
    if(this.plateZa === '') return;
    console.log(this.plateZa);
    const pdfElement = this.sharedService.extractHtmlFromTemplate(this.pdfBankTemplate);
    if (pdfElement) {
      const htmlContent = pdfElement.innerHTML;
      this.sharedService.generatePdf(htmlContent).subscribe({
        next: (blob) => {
          this.sharedService.pdfForDownload(blob,this.plateZa);
        },
        error: (e) => console.error('Error generating PDF:', e)
      });
    } else {
      console.error('Element with id "pdf-content" not found.');
    }
  }

  ngOnInit() {
    this.updateBankData();
  }

  updateBankData() {
    this.bankData.forEach(bank => {
      const bankItem = this.bankAccounts.find(bankAccounts => bankAccounts.bankName === bank.bankName);
      if (bankItem) {
        bank.racun = bankItem.racun; 
      }
    });
  }
}
