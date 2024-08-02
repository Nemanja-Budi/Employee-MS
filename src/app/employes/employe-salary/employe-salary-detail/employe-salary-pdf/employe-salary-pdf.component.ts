import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employe-salary-pdf',
  templateUrl: './employe-salary-pdf.component.html',
  styleUrls: ['./employe-salary-pdf.component.css']
})
export class EmployeSalaryPdfComponent {

  sharedService: SharedService = inject(SharedService);

  @Input() employeSalaryData!: EmployeSalary;
  @Input() hourlyRate: number = 0;

  @ViewChild('pdfTemplate', { static: false }) pdfTemplate!: TemplateRef<any>;

  @Output() pdf: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>;

  generatePdf(): void {
    const pdfElement = this.sharedService.extractHtmlFromTemplate(this.pdfTemplate);
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
        error: (e) => console.error('Error generating PDF', e)
      });
    } else {
      console.error('Element with id "pdf-content" not found.');
    }
  }
}
