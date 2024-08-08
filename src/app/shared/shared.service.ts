import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
