import { Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';

import { Observable } from 'rxjs';
import { AnnualleaveService } from '../annualleave.service';

@Component({
  selector: 'app-annual-leave-modal',
  templateUrl: './annual-leave-modal.component.html',
  styleUrls: ['./annual-leave-modal.component.css']
})
export class AnnualLeaveModalComponent implements OnInit {

  annualleaveService: AnnualleaveService = inject(AnnualleaveService);
  router: Router = inject(Router);

  currentAnnualLeave!: AnnualLeave;
  message: string = '';
  
  @ViewChild('anuualLeaveAction', { static: true }) anuualLeaveAction!: ElementRef<HTMLDialogElement>;
  @ViewChild('anuualLeaveDetail', { static: true }) anuualLeaveDetail!: ElementRef<HTMLDialogElement>;
  @ViewChild('deleteAnnualLeave', { static: true }) deleteAnnualLeave!: ElementRef<HTMLDialogElement>;

  @Output() deletedAction: EventEmitter<string> = new EventEmitter<string>();

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
    if(!this.currentAnnualLeave) return;
    this.onCloseModals();
    this.router.navigate([`/employes/annual-leave/update-annual-leave/${this.currentAnnualLeave.annualLeaveId}`])
  }

  onCloseModals(): void {
    this.annualleaveService.currentAnnualLeaveSubject.next(null);
    this.anuualLeaveAction.nativeElement.close();
  }

  onConfirm(): void {
    if(!this.currentAnnualLeave) return;
    this.annualleaveService.deleteAnnualLeave(this.currentAnnualLeave.annualLeaveId).subscribe({
      next:(response) => {
        this.deleteAnnualLeave.nativeElement.close();
        this.onCloseModals();
        console.log(response.message);
        this.deletedAction.emit(response.message);
      },
      error:(err) => console.error(`Error`, err)
    });
  }

  onCloseDeleteModal(): void {
    this.deleteAnnualLeave.nativeElement.close();
    this.onCloseModals();
  }

  openDeleteModal(): void {
    this.anuualLeaveAction.nativeElement.close();
    this.deleteAnnualLeave.nativeElement.showModal();
  }

}
