import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employe-salary-action',
  templateUrl: './employe-salary-action.component.html',
  styleUrls: ['./employe-salary-action.component.css']
})
export class EmployeSalaryActionComponent {

  @Input({required: true}) employeSalaryId: string = '';
  @Input({required: true}) employeId: string = '';
}
