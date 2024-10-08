import { Component, Input } from '@angular/core';
import { CustomBank } from 'src/app/banks/types/custom.bank.type';

@Component({
  selector: 'app-employe-salary-bank-pdf-preview',
  templateUrl: './employe-salary-bank-pdf-preview.component.html',
  styleUrls: ['./employe-salary-bank-pdf-preview.component.css']
})
export class EmployeSalaryBankPdfPreviewComponent {

  @Input() bankData: CustomBank[] = [];
  @Input() total: number = 1;
  
}
