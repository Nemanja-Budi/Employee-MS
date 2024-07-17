import { Component, inject } from '@angular/core';
import { EmployeService } from '../employe.service';

@Component({
  selector: 'app-employe-paganation',
  templateUrl: './employe-paganation.component.html',
  styleUrls: ['./employe-paganation.component.css']
})
export class EmployePaganationComponent {

  employeService: EmployeService = inject(EmployeService);
  currentPage: number = this.employeService.employeQuearyParamsSubject.value.pageNumber;

  visiblePages(): number[] {
    const maxPagesToShow = 3;
    const startPage = Math.max(1, this.employeService.employeQuearyParamsSubject.value.pageNumber - 1);
    const endPage = Math.min(this.employeService.currentSize.value, startPage + maxPagesToShow - 1);
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
    this.currentPage = this.employeService.currentSize.value
    this.updatePage(this.currentPage);
  }

  goToPreviousPage(): void {
    if (this.employeService.employeQuearyParamsSubject.value.pageNumber > 1) {
      this.employeService.employeQuearyParamsSubject.value.pageNumber--;
      this.updatePage(this.employeService.employeQuearyParamsSubject.value.pageNumber);
    }
  }

  goToNextPage(): void {
    if (this.employeService.employeQuearyParamsSubject.value.pageNumber < this.employeService.currentSize.value) {
      this.employeService.employeQuearyParamsSubject.value.pageNumber++;
      this.updatePage(this.employeService.employeQuearyParamsSubject.value.pageNumber);
    }
  }

  private updatePage(page: number) {
    return this.employeService.employeQuearyParamsSubject.next({
      ...this.employeService.employeQuearyParamsSubject.value,
      pageNumber: page
    });
  }
}
