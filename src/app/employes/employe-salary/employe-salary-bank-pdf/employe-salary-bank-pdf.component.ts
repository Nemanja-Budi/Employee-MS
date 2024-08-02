import { Component, EventEmitter, inject, Output, TemplateRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { CustomBank, EmployeSalaryService } from '../employe-salary.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employe-salary-bank-pdf',
  templateUrl: './employe-salary-bank-pdf.component.html',
  styleUrls: ['./employe-salary-bank-pdf.component.css']
})
export class EmployeSalaryBankPdfComponent {

  sharedService: SharedService = inject(SharedService);
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  bankData: Observable<CustomBank[]> = this.employeSalaryService.bankData;
  @ViewChild('pdfBankTemplate', { static: false }) pdfBankTemplate!: TemplateRef<any>;
  
  generatePdf(): void {
    const pdfElement = this.sharedService.extractHtmlFromTemplate(this.pdfBankTemplate);
    if (pdfElement) {
      const htmlContent = pdfElement.innerHTML;
      this.sharedService.generatePdf(htmlContent).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'employee-salary.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (e) => console.error('Error generating PDF:', e)
      });
    } else {
      console.error('Element with id "pdf-content" not found.');
    }
  }
}
