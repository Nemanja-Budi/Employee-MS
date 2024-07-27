import { Component, inject, Input } from '@angular/core';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../employe.service';

@Component({
  selector: 'app-employe-item',
  templateUrl: './employe-item.component.html',
  styleUrls: ['./employe-item.component.css']
})
export class EmployeItemComponent {
  
  employeService: EmployeService = inject(EmployeService);
  
  @Input({required: true}) employe!: Employe;
  @Input({required: true}) showModalInDetail: boolean = false;
  @Input() forImageHeight: boolean = false;

  openDialog(employe: Employe): void {
    this.employeService.employeSubject.next(employe);
  }


}
