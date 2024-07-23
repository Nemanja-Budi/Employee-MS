import { Component, inject, Input } from '@angular/core';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../../../employes/employe/employe.service';

@Component({
  selector: 'app-employe-item',
  templateUrl: './employe-item.component.html',
  styleUrls: ['./employe-item.component.css']
})
export class EmployeItemComponent {
  
  employeService: EmployeService = inject(EmployeService);
  @Input() employe!: Employe;
  // @Input({required: true}) hEmploye: string = '';
  @Input({required: true}) hEmployePicture: string = '';
  openDialog(employe: Employe): void {
    this.employeService.openModal(employe);
  }

}
