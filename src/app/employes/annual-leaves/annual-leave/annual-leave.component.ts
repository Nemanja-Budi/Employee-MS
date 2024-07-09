import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeService } from 'src/app/employe.service';
import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';

@Component({
  selector: 'app-annual-leave',
  templateUrl: './annual-leave.component.html',
  styleUrls: ['./annual-leave.component.css']
})
export class AnnualLeaveComponent {

  employeService: EmployeService = inject(EmployeService);
  annualleaves: Observable<AnnualLeave[]> = this.employeService.getAllAnnualLeave();
}
