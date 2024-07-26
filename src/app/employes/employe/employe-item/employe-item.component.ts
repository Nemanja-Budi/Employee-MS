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
  @Input({required: true}) hEmployePicture: string = '';
  @Input({required: true}) showModal: boolean = false;
  @Input({required: true}) showModalInDetail: boolean = false;
  
  openDialog(employe: Employe): void {
    this.employeService.openModal(employe);
  }

}
