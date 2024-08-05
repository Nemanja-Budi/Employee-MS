import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';
import { AnnualleaveService } from '../annualleave.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-annual-leave-modal',
  templateUrl: './annual-leave-modal.component.html',
  styleUrls: ['./annual-leave-modal.component.css']
})
export class AnnualLeaveModalComponent implements OnInit {

  annualleaveService: AnnualleaveService = inject(AnnualleaveService);
  router: Router = inject(Router);

  @ViewChild('anuualLeaveAction', { static: true }) anuualLeaveAction!: ElementRef<HTMLDialogElement>;
  @ViewChild('anuualLeaveDetail', { static: true }) anuualLeaveDetail!: ElementRef<HTMLDialogElement>;

  currentAnnualLeave!: AnnualLeave;

  ngOnInit(): void {
    if(this.annualleaveService.currentAnnualLeaveSubject.value !== null) {
    this.currentAnnualLeave = this.annualleaveService.currentAnnualLeaveSubject.value;
    this.anuualLeaveAction.nativeElement.showModal();
    } else {
      this.onCloseModals();
    }
  }

  onOpenAnnualLeaveDetail(): void {
    this.anuualLeaveAction.nativeElement.close();
    this.anuualLeaveDetail.nativeElement.showModal();
  }

  onGoToAlEdit(): void {
    if(this.currentAnnualLeave.annualLeaveId === '') return;
    this.onCloseModals();
    this.router.navigate([`/employes/annual-leave/update-annual-leave/${this.currentAnnualLeave.annualLeaveId}`])
  }

  onCloseModals(): void {
    this.annualleaveService.currentAnnualLeaveSubject.next(null);
    this.anuualLeaveAction.nativeElement.close();
  }

}
