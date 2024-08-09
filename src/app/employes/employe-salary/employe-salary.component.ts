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
      } else {
        console.log(`ID JE OVDE else ${this.selectedEmployeId}`)
      }
    });
  }

  ngOnDestroy(): void {
    this.employeSalaryService.resetFilters();
  }

  openBankModal(): void {
    this.employeSalaryService.isModalOpen.next(true);
  }
}
