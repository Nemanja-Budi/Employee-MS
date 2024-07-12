import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeService } from 'src/app/employe.service';
import { Employe } from 'src/app/models/employe.model';

@Component({
  selector: 'app-employe-salary-select',
  templateUrl: './employe-salary-select.component.html',
  styleUrls: ['./employe-salary-select.component.css']
})
export class EmployeSalarySelectComponent {

  @Input() control: FormControl = new FormControl('');  // Defaultni FormControl ako nije postavljen
  @Output() selectionChange = new EventEmitter<string>();

  employes: Observable<Employe[]> = this.employeService.getEmployes();

  constructor(private employeService: EmployeService) {}

  ngOnInit(): void {}

  onChangeSelect(value: string): void {
    this.selectionChange.emit(value);
  }
}
