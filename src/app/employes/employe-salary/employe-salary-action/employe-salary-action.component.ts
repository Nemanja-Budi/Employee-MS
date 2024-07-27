import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { EmployeSalaryService } from '../employe-salary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe-salary-action',
  templateUrl: './employe-salary-action.component.html',
  styleUrls: ['./employe-salary-action.component.css']
})
export class EmployeSalaryActionComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  router: Router = inject(Router);
  @ViewChild('deleteSalaryModal', { static: true }) deleteSalaryModal!: ElementRef<HTMLDialogElement>;

  @Input({required: true}) employeSalaryId: string = '';
  @Input({required: true}) employeId: string = '';
  
  onConfirm(): void {
    this.employeSalaryService.deleteEmployeSalary(this.employeSalaryId).subscribe({
      next: () => {
        this.deleteSalaryModal.nativeElement.close();
        this.router.navigate(["/employes/salary/all-salarys"]);
        
      },
      error: (e) => console.log(e)
    });
  }

  onCloseModal(): void {
    this.deleteSalaryModal.nativeElement.close();
    // this.customModal.nativeElement.showModal();
  }

 openDeleteModal(employeSalaryId: string) {
  this.employeSalaryId = employeSalaryId;
  this.deleteSalaryModal.nativeElement.showModal();
 }
}
