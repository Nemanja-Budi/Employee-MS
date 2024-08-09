import { Component, inject, OnDestroy } from '@angular/core';
import { EmployeService } from './employe.service';
import { Employe } from 'src/app/models/employe/employe.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnDestroy {

  employeService: EmployeService = inject(EmployeService);
  employes: Observable<Employe[]> = this.employeService.getEmployes().pipe(map((employes) => employes.employes));

  ngOnDestroy(): void {
    this.employeService.resetFilters();
  }
}
