import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmployeService } from 'src/app/employe.service';
import { EmployeChild } from 'src/app/models/employe.child.model';
import { Employe } from 'src/app/models/employe.model';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent {

  employeService: EmployeService = inject(EmployeService);
  employeChilds: EmployeChild[] | undefined = undefined;  
  employes: Observable<Employe[]> = this.employeService.getEmployes().pipe(map((employes) => {
    employes.map((e) => {
      if(e.employeChild) {
        this.employeChilds = e.employeChild
      }
    });
    return employes;
  }));

  onDeleteEmploye(employeId: string): void {
    this.employeService.deleteEmploye(employeId).subscribe({ 
      next: (employe) => console.log(employe),
      error: () => console.log("Error")
    });
  }
}
