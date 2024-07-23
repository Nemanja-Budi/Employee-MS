import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeSalaryService } from '../../employe-salary.service';
import { EmployeService } from 'src/app/employes/employe/employe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employe-salary-list-select',
  templateUrl: './employe-salary-list-select.component.html',
  styleUrls: ['./employe-salary-list-select.component.css']
})
export class EmployeSalaryListSelectComponent implements OnInit {

  employeService: EmployeService = inject(EmployeService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  employes!: Observable<Employe[]>;
  employe!: Observable<Employe>;

  @Input() selectedEmployeId: string | null = null;
  @Output() changeEnployeEvent: EventEmitter<string> = new EventEmitter<string>();

  onChangeSelect(changeSelect: string): void {
    this.changeEnployeEvent.emit(changeSelect);
  }

  ngOnInit(): void {
    console.log("&&&&&&&&&&&&&&&&&&&&&");
    console.log(this.selectedEmployeId);
    console.log("&&&&&&&&&&&&&&&&&&&&&");

    if(this.selectedEmployeId === null) {
      this.employes = this.employeService.getEmployesForSelect();
      console.log("else nema id");

    } else {
      this.employe = this.employeService.getEmploye(this.selectedEmployeId);
      this.employes = this.employeService.getEmployesForSelect().pipe(map((e) => e.filter((x) => x.id !== this.selectedEmployeId)))

      console.log("IMA ID");

    }
  }
}
