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
  @ViewChild('customModal', { static: true }) customModal!: ElementRef<HTMLDialogElement>;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @Input({required: true}) isDetail: boolean = false;

  private subscription: Subscription = new Subscription();
  employeForAction: Employe | null = null;

  constructor(private employeService: EmployeService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.employeService.employe$.subscribe(employe => {
      this.employeForAction = employe;
      if (employe) {
        this.customModal.nativeElement.showModal();
      } else {
        this.customModal.nativeElement.close();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown(): void {
    const menu = this.dropdownMenu.nativeElement;
    menu.classList.toggle('hidden');
  }

  onGoToEmployeDetail(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/employe/detail-employe/${this.employeForAction.id}`]);
    this.employeService.closeModal();
  }

  onGoToEmployeEdit(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/employe/edit-employe/${this.employeForAction.id}`]);
    this.employeService.closeModal();
  }

  onGoToEmployeSalary(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/salary/create-salary/${this.employeForAction.id}`]);
    this.employeService.closeModal();
  }

  onGoToEmployeSalaryByEmployeId(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/salary/all-salarys/${this.employeForAction.id}`]);
    this.employeService.closeModal();
  }

  onGoToEmployeVacation(): void {
    if (!this.employeForAction) return;
    this.router.navigate([`/employes/annual-leave/create-annual-leave/${this.employeForAction.id}`]);
    this.employeService.closeModal();
  }

  closeModal(): void {
    this.employeService.closeModal();
  }
}
