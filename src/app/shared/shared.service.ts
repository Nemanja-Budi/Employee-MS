import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DeleteMessage } from '../employes/annual-leaves/types/annual-leave.types';
import { PdfType } from './types/shared.types';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  months: string[] = [
    'januar', 'februar', 'mart', 'april', 'maj', 'jun',
    'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'
  ];

  constructor(private http: HttpClient) { }

  witchType: BehaviorSubject<string> = new BehaviorSubject<string>('text');
  isChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  pdfName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  pdf: BehaviorSubject<PdfType | null> = new BehaviorSubject<PdfType | null>(null);
  
  updatePdf(): void {
    this.getPdfItem(this.pdfName.value).subscribe({
      next: (response) => this.pdf.next(response),
      error: (error) => this.pdf.next(null)
    });
  }

  getMonths(): string[] {
    return this.months.slice();
  }

  getKeysWithoutFirstAndLast(obj: any): string[] {
    const keys = Object.keys(obj);
    return keys.slice(1, keys.length - 1);
  }

  formatKey(key: string): string {
    // console.log(key);
    // console.log('kljucenzi bite')
    if(key == "identityCardNumber") {
      key = 'id';
    } else if (key == "employeBankAccount") {
      key = 'bank account'
    }
    return key.replace(/([A-Z])/g, ' $1') // Razdvoji reči
              .replace(/^./, (str) => str.toUpperCase()) // Prvo slovo veliko
              .replace(/\b\w+\b/g, (word, index) => index === 0 ? word : word.toLowerCase()) // Samo prva reč veliko slovo
              .trim(); // Ukloni vodeće i prateće praznine
  }

  extractHtmlFromTemplate(template: TemplateRef<any>): HTMLElement {
    const container = document.createElement('div');
    const view = template.createEmbeddedView(null);
    view.detectChanges();
    container.appendChild(view.rootNodes[0].cloneNode(true));
    return container;
  }

  generatePdfForBanks(htmlContent: string, fileName: string): Observable<Blob> {
    return this.http.post(`http://localhost:5000/api/pdf/generate-for-banks`, { HtmlContent: htmlContent, FileName: fileName }, { responseType: 'blob' });
  }

  generatePdfForSalary(htmlContent: string, fileName: string): Observable<Blob> {
    return this.http.post(`http://localhost:5000/api/pdf/generate`, { HtmlContent: htmlContent, FileName: fileName }, { responseType: 'blob'});
  }
  
  sendPdf(fileName: string, email: string): Observable<any> {
    return this.http.post(`http://localhost:5000/api/pdf/send`, { FileName: fileName, Email: email });
  }

  getPdfItem(fileName: string): Observable<PdfType> {
    return this.http.get<PdfType>(`http://localhost:5000/api/pdf/item/${fileName}`);
  }
  
  getPdf(fileName: string): Observable<Blob> {
    const url = `http://localhost:5000/api/pdf/get-pdf/${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  deletePdf(fileName: string): Observable<DeleteMessage> {
    return this.http.delete<DeleteMessage>(`http://localhost:5000/api/pdf/delete-pdf/${fileName}`);
  }

  pdfForDownload(blob: Blob, pdfName: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdfName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  formatDate(dateInput: string): string {
    const dateParts = dateInput.split('-');
    if (dateParts.length === 1) {
        return `${dateParts[0]}`;
    } else if (dateParts.length === 2) {
        return `${dateParts[0]}-${dateParts[1].padStart(2, '0')}`;
    } else if (dateParts.length === 3) {
        const day = dateParts[2].padStart(2, '0');
        return `${dateParts[0]}-${dateParts[1].padStart(2, '0')}-${day === '00' ? '01' : day}`;
    } else {
        throw new Error('Invalid date input');
    }
  }

  getRoles(decodedToken: any): string {
    let route = '';
    if (Array.isArray(decodedToken.role)) {
      route = 'admin';
      console.log(route)
    } else if (typeof decodedToken.role === 'string') {
      route = decodedToken.role.toLowerCase();
      if(route == 'manager') {
        route = 'employes'
      } else if (route == 'player') {
        route = 'employes/salary'
      }
    }
    return route;
  }

}
