import { Component, Input } from '@angular/core';
import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';

@Component({
  selector: 'app-annual-leave-item',
  templateUrl: './annual-leave-item.component.html',
  styleUrls: ['./annual-leave-item.component.css']
})
export class AnnualLeaveItemComponent {

  @Input({required: true}) annualLeave!: AnnualLeave;
  @Input({required: true}) isDetail: boolean = false;
}
