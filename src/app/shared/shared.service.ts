import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getMonths(): string[] {
    return this.months.slice();
  }

  getKeysWithoutFirstAndLast(obj: any): string[] {
    const keys = Object.keys(obj);
    return keys.slice(1, keys.length - 1);
  }

  formatKey(key: string): string {
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

  generatePdf(htmlContent: string): Observable<Blob> {
    return this.http.post(`http://localhost:5000/api/pdf/generate`, { HtmlContent: htmlContent }, { responseType: 'blob' });
  }

  
  generatePdf2(htmlContent: string, fileName: string): Observable<Blob> {
    return this.http.post(`http://localhost:5000/api/pdf/generate`, { HtmlContent: htmlContent, FileName: fileName}, { responseType: 'blob'});
  }
  
  sendPdf(fileName: string, email: string): Observable<any> {
    return this.http.post(`http://localhost:5000/api/pdf/send`, { FileName: fileName, Email: email });
  }

  getPdfList(): Observable<PdfType[]> {
    return this.http.get<PdfType[]>(`http://localhost:5000/api/pdf/list`);
  }

  getPdfItem(fileName: string): Observable<PdfType> {
    return this.http.get<PdfType>(`http://localhost:5000/api/pdf/item/${fileName}`);
  }

  getPdf(fileName: string): Observable<PdfType> {
    return this.http.get<PdfType>(`http://localhost:5000/api/pdf/get-pdf/${fileName}`);
  }
  
  getPdf2(fileName: string): Observable<Blob> {
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

}
