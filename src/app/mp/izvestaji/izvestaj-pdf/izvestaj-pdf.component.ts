import { Component, inject, Input, TemplateRef, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { IzvestajiService } from '../izvestaji.service';

@Component({
  selector: 'app-izvestaj-pdf',
  templateUrl: './izvestaj-pdf.component.html',
  styleUrls: ['./izvestaj-pdf.component.css']
})
export class IzvestajPdfComponent {

  izvestajiService: IzvestajiService = inject(IzvestajiService);
  sharedService: SharedService = inject(SharedService);
  
  @Input() showCols: boolean = false;
  @ViewChild('pdfLagerTemplate', { static: false }) pdfLagerTemplate!: TemplateRef<any>;

  generatePdf(): void {
    const pdfElement = this.sharedService.extractHtmlFromTemplate(this.pdfLagerTemplate);
    if (pdfElement) {
      const nameOfPdf = this.createNameForPdfIzvestaj();
      const htmlContent = pdfElement.innerHTML;
      this.sharedService.generatePdfForBanks(htmlContent, nameOfPdf).subscribe({
        next: (blob) => {
          this.sharedService.pdfForDownload(blob, nameOfPdf);
        },
        error: (e) => console.error('Error generating PDF:', e)
      });
    } else {
      console.error('Element with id "pdf-content" not found.');
    }
  }

  private createNameForPdfIzvestaj(): string {
    
    let nameOfPdf = '';
    const sifra = this.izvestajiService.sifraProizvoda.value;
    const endDate = this.izvestajiService.endDate.value;

    if(this.izvestajiService.sifraProizvoda.value !== '') {
      nameOfPdf = `lager-lista-${sifra}-na-dan-${endDate}`;
    } else {
      nameOfPdf = `lager-lista-proizvoda-na-dan-${endDate}`;
    }
    return nameOfPdf;
  }
}
