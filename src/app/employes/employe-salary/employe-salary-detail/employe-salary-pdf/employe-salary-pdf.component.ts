import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';
import { SharedService } from 'src/app/shared/shared.service';
import { PdfType } from 'src/app/shared/types/shared.types';

@Component({
  selector: 'app-employe-salary-pdf',
  templateUrl: './employe-salary-pdf.component.html',
  styleUrls: ['./employe-salary-pdf.component.css']
})
export class EmployeSalaryPdfComponent {

  sharedService: SharedService = inject(SharedService);

  email: string = 'dobrikasi@gmail.com'
  message: string = ``;
  getPdf: Observable<PdfType> = this.sharedService.getPdfItem(this.sharedService.pdfName.value)

  @Input() employeSalaryData!: EmployeSalary;
  @Input() hourlyRate: number = 0;
  @Input() imeIprz: string = '';
  @Input() show: boolean = false;

  @ViewChild('pdfTemplate', { static: false }) pdfTemplate!: TemplateRef<any>;
  @ViewChild('previewSalaryPdf', { static: true }) previewSalaryPdf!: ElementRef<HTMLDialogElement>;
  @ViewChild('messageModal', { static: true }) messageModal!: ElementRef<HTMLDialogElement>;

  generatePdf(): void {
    if (this.imeIprz === '') return;
    const pdfElement = this.sharedService.extractHtmlFromTemplate(this.pdfTemplate);
    if (pdfElement) {
      const htmlContent = pdfElement.innerHTML;
      this.sharedService.generatePdfForSalary(htmlContent, this.imeIprz).subscribe({
        next: (response) => {
          this.getPdf = this.sharedService.getPdfItem(this.sharedService.pdfName.value)
          // this.sharedService.pdfForDownload(new Blob([htmlContent], { type: 'application/pdf' }), this.imeIprz);
          this.previewSalaryPdf.nativeElement.close();
        },
        error: (e) => console.error('Error generating PDF', e)
      });
    } else {
      console.error('Element with id "pdf-content" not found.');
    }
  }

  sendEmail(pdf: PdfType): void {
    if(this.sharedService.pdfName.value === '') return;
    console.log(pdf.url.toString());
    this.sharedService.sendPdf(this.sharedService.pdfName.value, this.email).subscribe({
      next: (response) => {
        this.message = response.message;
        this.messageModal.nativeElement.showModal();
        this.getPdf = this.sharedService.getPdfItem(this.sharedService.pdfName.value);
      },
      error: (e) => {
        console.error('Error sending email:', e);
      }
    });
  }

  previewPdf(pdf: PdfType): void {
    console.log(pdf);
    this.sharedService.getPdf(pdf.name).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      },
      error: (err) => {
        console.error('Error while fetching the PDF:', err);
      }
    });
  }

  deletePdf(pdf: PdfType): void {
    this.sharedService.deletePdf(pdf.name).subscribe({
      next:(response) => {
        this.getPdf = this.sharedService.getPdfItem(this.sharedService.pdfName.value);
        this.message = response.message;
        this.messageModal.nativeElement.showModal();
        console.log(response);
      },
      error:(e) => console.error(e)
    });
  }

  onCloseMessageModal(): void {
    this.messageModal.nativeElement.close();
  }

  onOpenPreview(): void {
    this.previewSalaryPdf.nativeElement.showModal();
  }

  onClosePreviewDetailModal(): void {
    this.previewSalaryPdf.nativeElement.close();
  }
}
