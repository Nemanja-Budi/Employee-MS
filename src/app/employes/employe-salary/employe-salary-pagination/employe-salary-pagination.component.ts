import { Component, inject } from '@angular/core';
import { EmployeSalaryService } from '../employe-salary.service';
import { EmployeService } from '../../employe/employe.service';

@Component({
  selector: 'app-employe-salary-pagination',
  templateUrl: './employe-salary-pagination.component.html',
  styleUrls: ['./employe-salary-pagination.component.css']
})
export class EmployeSalaryPaginationComponent {
  
  employeSalaryService: EmployeSalaryService = inject(EmployeSalaryService);
  employeService: EmployeService = inject(EmployeService);
  currentPage: number = this.employeSalaryService.employeSalaryQuearyParamsSubject.value.pageNumber;

  visiblePages(): number[] {
    const maxPagesToShow = 3;
    const startPage = Math.max(1, this.employeSalaryService.employeSalaryQuearyParamsSubject.value.pageNumber - 1);
    const endPage = Math.min(this.employeSalaryService.currentSize.value, startPage + maxPagesToShow - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage(this.currentPage);
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.updatePage(this.currentPage);
  }

  goToLastPage(): void {
    this.currentPage = this.employeSalaryService.currentSize.value
    this.updatePage(this.currentPage);
  }

  goToPreviousPage(): void {
    if (this.employeSalaryService.employeSalaryQuearyParamsSubject.value.pageNumber > 1) {
      this.employeSalaryService.employeSalaryQuearyParamsSubject.value.pageNumber--;
      this.updatePage(this.employeSalaryService.employeSalaryQuearyParamsSubject.value.pageNumber);
    }
  }

  goToNextPage(): void {
    if (this.employeSalaryService.employeSalaryQuearyParamsSubject.value.pageNumber < this.employeSalaryService.currentSize.value) {
      this.employeSalaryService.employeSalaryQuearyParamsSubject.value.pageNumber++;
      this.updatePage(this.employeSalaryService.employeSalaryQuearyParamsSubject.value.pageNumber);
    }
  }

  private updatePage(page: number) {
    return this.employeSalaryService.employeSalaryQuearyParamsSubject.next({
      ...this.employeSalaryService.employeSalaryQuearyParamsSubject.value,
      pageNumber: page
    });
  }
}
