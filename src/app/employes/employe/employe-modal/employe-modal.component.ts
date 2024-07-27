import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employe } from 'src/app/models/employe/employe.model';
import { EmployeService } from '../employe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employe-modal',
  templateUrl: './employe-modal.component.html',
  styleUrls: ['./employe-modal.component.css']
})
export class EmployeModalComponent {
  
  employeService: EmployeService = inject(EmployeService);
  router: Router = inject(Router);

  @ViewChild('customModal', { static: true }) customModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('deleteModal', { static: true }) deleteModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @Input({required: true}) isDetail: boolean = false;

  employeForAction: Employe | null = null;

  ngOnInit(): void {
    if(this.employeService.employeSubject.value !== null) {
    this.employeForAction = this.employeService.employeSubject.value;
    this.customModal.nativeElement.showModal();
    } else {
      this.customModal.nativeElement.close();
    }
  }

  toggleDropdown(): void {
    const menu = this.dropdownMenu.nativeElement;
    menu.classList.toggle('hidden');
  }

  onGoToEmployeDetail(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/employe/detail-employe/${this.employeForAction.id}`]);
    this.customModal.nativeElement.close();
    this.employeService.employeSubject.next(null);
  }

  onGoToEmployeEdit(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/employe/edit-employe/${this.employeForAction.id}`]);
    this.employeService.employeSubject.next(null);
  }

  onGoToEmployeSalary(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/salary/create-salary/${this.employeForAction.id}`]);
    this.employeService.employeSubject.next(null);
  }

  onGoToEmployeSalaryByEmployeId(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/salary/all-salarys/${this.employeForAction.id}`]);
    this.employeService.employeSubject.next(null);
  }

  onGoToEmployeVacation(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/annual-leave/create-annual-leave/${this.employeForAction.id}`]);
    this.employeService.employeSubject.next(null);
  }

  closeModal(): void {
    this.employeService.employeSubject.next(null);
  }

  onConfirm(): void {
    if(this.employeForAction && this.employeForAction.id) {
      this.employeService.deleteEmploye(this.employeForAction.id).subscribe({
        next: () => {
          this.customModal.nativeElement.close();
          this.employeService.employeSubject.next(null);
          this.router.navigate([`/employes/employe/all-employes`]);
        },
        error: (e) => console.log(e)
      });
    }
  }

  onCloseModal(): void {
    this.deleteModal.nativeElement.close();
    this.customModal.nativeElement.showModal();
  }

  openDeleteModal() {
    this.customModal.nativeElement.close();
    this.deleteModal.nativeElement.showModal();

  }
}
