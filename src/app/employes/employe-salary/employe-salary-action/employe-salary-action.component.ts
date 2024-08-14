import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { EmployeSalaryService } from '../employe-salary.service';
import { Router } from '@angular/router';
import { catchError, concatMap, map, of, tap } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-employe-salary-action',
  templateUrl: './employe-salary-action.component.html',
  styleUrls: ['./employe-salary-action.component.css']
})
export class EmployeSalaryActionComponent {

  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  sharedService: SharedService = inject(SharedService);
  router: Router = inject(Router);

  @ViewChild('deleteSalaryModal', { static: true }) deleteSalaryModal!: ElementRef<HTMLDialogElement>;

  @Input({required: true}) employeSalaryId: string = '';
  @Input({required: true}) employeId: string = '';
  
  onConfirm(): void {
    this.employeSalaryService.deleteEmployeSalary(this.employeSalaryId).pipe(
      concatMap((salary) => 
        this.sharedService.deletePdf(this.sharedService.pdfName.value).pipe(
          catchError((error) => {
            console.error('Error deleting PDF, but continuing:', error);
            return of(null);
          }),
          map(() => salary)
        )
      ),
      tap(() => this.router.navigate(["/employes/salary/all-salarys"])),
      tap(() => this.deleteSalaryModal.nativeElement.close())
    ).subscribe({
      next: (response) => console.log(response),
      error: (e) => console.error(e)
    });
  }

  onCloseModal(): void {
    this.deleteSalaryModal.nativeElement.close();
  }

 openDeleteModal(employeSalaryId: string) {
  this.employeSalaryId = employeSalaryId;
  this.deleteSalaryModal.nativeElement.showModal();
 }
}
