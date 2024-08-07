import { Component, Input } from '@angular/core';
import { CustomBank } from 'src/app/employes/employe-salary/types/employe.salary.types';

@Component({
  selector: 'app-probicko',
  templateUrl: './probicko.component.html',
  styleUrls: ['./probicko.component.css']
})
export class ProbickoComponent {

  @Input() bankData: CustomBank[] = [];
  @Input() total: number = 1;
}
