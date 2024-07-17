import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { AnnualleaveService } from '../annualleave.service';

@Component({
  selector: 'app-annual-leave',
  templateUrl: './annual-leave.component.html',
  styleUrls: ['./annual-leave.component.css']
})
export class AnnualLeaveComponent {

  annualLeavesService: AnnualleaveService = inject(AnnualleaveService);
  annualleaves: Observable<AnnualLeave[]> = this.annualLeavesService.getAllAnnualLeave();
}
