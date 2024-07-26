import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap } from 'rxjs';

import { EmployeService } from 'src/app/employes/employe/employe.service';
import { Employe } from 'src/app/models/employe/employe.model';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employe-detail',
  templateUrl: './employe-detail.component.html',
  styleUrls: ['./employe-detail.component.css']
})
export class EmployeDetailComponent {

  employeService: EmployeService = inject(EmployeService);
  sharedService: SharedService = inject(SharedService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  employe: Observable<Employe> = this.activatedRoute.paramMap.pipe(concatMap((param) => {
    const id = param.get('id');
    return this.employeService.getEmploye(String(id));
  }));

  onGetKeysWithoutFirstAndLast(obj: any): Array<string> {
    return this.sharedService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.sharedService.formatKey(key);
  }

}
