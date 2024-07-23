import { Component, inject, Input } from '@angular/core';
import { Observable, map } from 'rxjs';

import { EmployeChild } from 'src/app/models/employe/employe.child.model';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from 'src/app/employes/employe/employe.service';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent {

  employeService: EmployeService = inject(EmployeService);
  employes: Observable<Employe[]> = this.employeService.getEmployes().pipe(map((employes) => employes.employes));
  
}

