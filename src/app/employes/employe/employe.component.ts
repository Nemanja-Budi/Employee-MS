import { Component, inject, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { EmployeService } from 'src/app/employe.service';
import { Employe } from 'src/app/models/employe.model';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent {

  employeService: EmployeService = inject(EmployeService);
  employes: Observable<Employe[]> = this.employeService.getEmployes();


}
