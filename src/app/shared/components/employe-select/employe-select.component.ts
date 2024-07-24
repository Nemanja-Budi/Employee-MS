import { Component, inject, Input } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../../../employes/employe/employe.service';

@Component({
  selector: 'app-employe-select',
  templateUrl: './employe-select.component.html',
  styleUrls: ['./employe-select.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ]
})
export class EmployeSelectComponent {

  @Input() label: string = '';
  @Input() controlName: string = '';

  employes: Observable<Employe[]>;

  constructor(private employeService: EmployeService, private controlContainer: ControlContainer) {
    this.employes = this.employeService.getEmployesForSelect();
  }
  
  get parentFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }
}
