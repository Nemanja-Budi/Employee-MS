import { Component, Input } from '@angular/core';
import { EmployeChild } from 'src/app/models/employe.child.model';

@Component({
  selector: 'app-employe-child',
  templateUrl: './employe-child.component.html',
  styleUrls: ['./employe-child.component.css']
})
export class EmployeChildComponent {

  @Input() employeChild: EmployeChild[] = [];
}
