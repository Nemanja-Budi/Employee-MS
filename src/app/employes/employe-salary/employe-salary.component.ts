import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { EmployeSalaryService } from './employe-salary.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-employe-salary',
  templateUrl: './employe-salary.component.html',
  styleUrls: ['./employe-salary.component.css']
})
export class EmployeSalaryComponent implements OnInit, OnDestroy {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  selectedEmployeId: string | null = null;
  naslov: string = `Sve plate zaposlenih`;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('employeId');
      if(id !== null) {
        this.selectedEmployeId = id;
        this.naslov = `Sve plate zaposlenog`
        console.log(`ID JE OVDE if ${this.selectedEmployeId}`)
      } else {
        console.log(`ID JE OVDE else ${this.selectedEmployeId}`)
      }
    });
  }

  ngOnDestroy(): void {
    console.log("Unistavam se");
    this.employeSalaryService.resetFilters();
  }
}
