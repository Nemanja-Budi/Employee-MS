import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  witchType: BehaviorSubject<string> = new BehaviorSubject<string>('text');
  isChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

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

}
