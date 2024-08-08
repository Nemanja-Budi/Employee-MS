import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class AnnualLeaveComponent implements OnDestroy{

  annualleaveService: AnnualleaveService = inject(AnnualleaveService);
  sharedService: SharedService = inject(SharedService);
  
  annualleave: Observable<AnnualLeave[]> = this.annualleaveService.getAllAnnualLeave().pipe(map((al) => al.annualLeaves));
  @ViewChild('messageModal', { static: true }) messageModal!: ElementRef<HTMLDialogElement>;

  message: string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat vel temporibus animi possimus eum debitis quia sunt natus esse fuga quis dolorem obcaecati quae cumque molestiae excepturi iure impedit id eos ipsam, minus exercitationem nisi nulla minima. Voluptas atque consequatur vero nulla molestias, quaerat amet hic quo! Quia, minima iusto?`;

  onGetKeysWithoutFirstAndLast(obj: any): Array<string> {
    return this.sharedService.getKeysWithoutFirstAndLast(obj);
  }
  
  onFormatKey(key: string): string {
    return this.sharedService.formatKey(key);
  }

  onOpenAlModal(annualLeave: AnnualLeave): void {
    this.annualleaveService.currentAnnualLeaveSubject.next(annualLeave);
  }

  onUpdateAL(deleteEventMessage: string): void {
    if(deleteEventMessage === '' ) return;
    this.message = deleteEventMessage;
    this.messageModal.nativeElement.showModal();
    this.annualleave = this.annualleaveService.getAllAnnualLeave().pipe(map((al) => al.annualLeaves));

  }

  onCloseMessageModal(): void {
    this.messageModal.nativeElement.close();
  }

  ngOnDestroy(): void {
    this.annualleaveService.resetFilters();
  }

}
