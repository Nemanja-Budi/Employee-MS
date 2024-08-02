import { Component, EventEmitter, inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { CustomBank, EmployeSalaryService } from '../employe-salary.service';
import { Observable } from 'rxjs';
import { BankAccount } from '../types/employe.salary.types';



@Component({
  selector: 'app-employe-salary-bank-pdf',
  templateUrl: './employe-salary-bank-pdf.component.html',
  styleUrls: ['./employe-salary-bank-pdf.component.css']
})
export class EmployeSalaryBankPdfComponent implements OnInit {

  sharedService: SharedService = inject(SharedService);
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  pdfName: string = 'salary-by-banks.pdf';
  bankAccounts: BankAccount[] = this.employeSalaryService.getBankAccounts();
 

  @Input({required: true}) bankData: CustomBank[] = [];
  @Input({required: true}) total: number = 0;
  
  @ViewChild('pdfBankTemplate', { static: false }) pdfBankTemplate!: TemplateRef<any>;
  
  generatePdf(): void {
    const pdfElement = this.sharedService.extractHtmlFromTemplate(this.pdfBankTemplate);
    if (pdfElement) {
      const htmlContent = pdfElement.innerHTML;
      this.sharedService.generatePdf(htmlContent).subscribe({
        next: (blob) => {
          this.sharedService.pdfForDownload(blob,this.pdfName);
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
