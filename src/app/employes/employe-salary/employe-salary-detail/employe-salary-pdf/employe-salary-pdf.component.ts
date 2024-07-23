import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { EmployeSalary } from 'src/app/models/employe-salary/employe.salary.model';

@Component({
  selector: 'app-employe-salary-pdf',
  templateUrl: './employe-salary-pdf.component.html',
  styleUrls: ['./employe-salary-pdf.component.css']
})
export class EmployeSalaryPdfComponent {
  @Input() employeSalaryData!: EmployeSalary;
  @Input() hourlyRate: number = 0;

  @ViewChild('pdfTemplate', { static: false }) pdfTemplate!: TemplateRef<any>;

  @Output() pdf: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>;

  generatePdf(): void {
    console.log("s");
    const htmlContent = this.extractHtmlFromTemplate(this.pdfTemplate);

    if(!htmlContent) return;
    console.log("prosao uslov");
    this.pdf.emit(htmlContent)
  }

  private extractHtmlFromTemplate(template: TemplateRef<any>): HTMLElement {
    const container = document.createElement('div');
    const view = template.createEmbeddedView(null);
    view.detectChanges();
    container.appendChild(view.rootNodes[0].cloneNode(true));
    return container;
  }
}
