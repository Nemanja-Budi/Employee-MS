import { Component, inject, Input } from '@angular/core';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../employe.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-employe-item',
  templateUrl: './employe-item.component.html',
  styleUrls: ['./employe-item.component.css']
})
export class EmployeItemComponent {
  
  employeService: EmployeService = inject(EmployeService);
  @Input() employe!: Employe;
  @Input({required: true}) hEmployePicture: string = '';
  @Input({required: true}) isDetail: boolean = false;
  openDialog(employe: Employe): void {
    this.employeService.openModal(employe);
  }

}
