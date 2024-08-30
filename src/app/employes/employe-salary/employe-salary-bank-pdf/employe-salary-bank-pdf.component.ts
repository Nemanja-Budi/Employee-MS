import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';

import { SharedService } from 'src/app/shared/shared.service';
import { EmployeSalaryService } from '../employe-salary.service';
import { CustomBank } from 'src/app/banks/types/custom.bank.type';

@Component({
  selector: 'app-employe-salary-bank-pdf',
  templateUrl: './employe-salary-bank-pdf.component.html',
  styleUrls: ['./employe-salary-bank-pdf.component.css']
})
export class EmployeSalaryBankPdfComponent {

  sharedService: SharedService = inject(SharedService);
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);

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
      this.sharedService.generatePdfForBanks(htmlContent, this.plateZa).subscribe({
        next: (blob) => {
          this.sharedService.pdfForDownload(blob,this.plateZa);
        },
        error: (e) => console.error('Error generating PDF:', e)
      });
    } else {
      console.error('Element with id "pdf-content" not found.');
    }
  }

}
