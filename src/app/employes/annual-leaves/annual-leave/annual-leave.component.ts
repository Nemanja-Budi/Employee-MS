import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';

import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { AnnualleaveService } from '../annualleave.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../../employe/employe.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-annual-leave',
  templateUrl: './annual-leave.component.html',
  styleUrls: ['./annual-leave.component.css']
})
export class AnnualLeaveComponent {

  annualleaveService: AnnualleaveService = inject(AnnualleaveService);
  sharedService: SharedService = inject(SharedService);
  
  annualleave: Observable<AnnualLeave[]> = this.annualleaveService.getAllAnnualLeave();
  
  onGetKeysWithoutFirstAndLast(obj: any): Array<string> {
    return this.sharedService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.sharedService.formatKey(key);
  }

  onOpenAlModal(annualLeave: AnnualLeave): void {
    this.annualleaveService.currentAnnualLeaveSubject.next(annualLeave);
  }

}
