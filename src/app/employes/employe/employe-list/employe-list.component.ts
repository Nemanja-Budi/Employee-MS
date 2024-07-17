import { Component, inject } from '@angular/core';
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
  employeChilds: EmployeChild[] | undefined = undefined;  
  employes: Observable<Employe[]> = this.employeService.getEmployes().pipe(map((employes) => {
    employes.employes.map((e) => {
      if(e.employeChild) {
        this.employeChilds = e.employeChild
      }
    });
    return employes.employes;
  }));

  onDeleteEmploye(employeId: string): void {
    this.employeService.deleteEmploye(employeId).subscribe({ 
      next: (employe) => console.log(employe),
      error: () => console.log("Error")
    });
  }

  onChange(): void {
    const currentValue = this.employeService.employeQuearyParamsSubject.value;
    const updatedValue = {
      ...currentValue,
      employeFilterDto: {
        ...currentValue.employeFilterDto,
        firstName: 'peri'
      }
    };
    this.employeService.employeQuearyParamsSubject.next(updatedValue);
  }
}

