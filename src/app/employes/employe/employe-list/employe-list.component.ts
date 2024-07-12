import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmployeService } from 'src/app/employe.service';
import { EmployeChild } from 'src/app/models/employe.child.model';
import { Employe } from 'src/app/models/employe.model';
import { Employe2Service } from '../employe2.service';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent {

  employeService: Employe2Service = inject(Employe2Service);
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
    // this.employeService.deleteEmploye(employeId).subscribe({ 
    //   next: (employe) => console.log(employe),
    //   error: () => console.log("Error")
    // });
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

