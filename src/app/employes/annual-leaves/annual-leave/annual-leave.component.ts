import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';

import { SharedService } from 'src/app/shared/shared.service';

import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { AnnualleaveService } from '../annualleave.service';

@Component({
  selector: 'app-annual-leave',
  templateUrl: './annual-leave.component.html',
  styleUrls: ['./annual-leave.component.css']
})
export class AnnualLeaveComponent implements OnDestroy{

  annualleaveService: AnnualleaveService = inject(AnnualleaveService);
  sharedService: SharedService = inject(SharedService);
  
  message: string = ``;
  annualleave: Observable<AnnualLeave[]> = this.annualleaveService.getAllAnnualLeave().pipe(map((al) => al.annualLeaves));
  @ViewChild('messageModal', { static: true }) messageModal!: ElementRef<HTMLDialogElement>;

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
