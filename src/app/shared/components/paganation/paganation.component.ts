import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-paganation',
  templateUrl: './paganation.component.html',
  styleUrls: ['./paganation.component.css']
})
export class PaganationComponent {

  @Input({required: true}) queryParamsSubject!: BehaviorSubject<any>;
  @Input({required: true}) currentSize!: BehaviorSubject<number>;
  @Input({required: true}) isNula!: BehaviorSubject<boolean>;

  visiblePages(): number[] {
    const maxPagesToShow = 3;
    const startPage = Math.max(1, this.queryParamsSubject.value.commonFilter.pageNumber - 1);
    const endPage = Math.min(this.currentSize.value, startPage + maxPagesToShow - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
  }
  
  goToPage(page: number): void {
    this.queryParamsSubject.value.commonFilter.pageNumber = page;
    this.updatePage(this.queryParamsSubject.value.commonFilter.pageNumber);
  }

  goToFirstPage(): void {
    this.queryParamsSubject.value.commonFilter.pageNumber = 1;
    this.updatePage(this.queryParamsSubject.value.commonFilter.pageNumber);
  }

  goToLastPage(): void {
    this.queryParamsSubject.value.commonFilter.pageNumber = this.currentSize.value
    this.updatePage(this.queryParamsSubject.value.commonFilter.pageNumber);
  }

  goToPreviousPage(): void {
    if (this.queryParamsSubject.value.commonFilter.pageNumber > 1) {
      this.queryParamsSubject.value.commonFilter.pageNumber--;
      this.updatePage(this.queryParamsSubject.value.commonFilter.pageNumber);
    }
  }

  goToNextPage(): void {
    if (this.queryParamsSubject.value.commonFilter.pageNumber < this.currentSize.value) {
      this.queryParamsSubject.value.commonFilter.pageNumber++;
      this.updatePage(this.queryParamsSubject.value.commonFilter.pageNumber);
    }
  }

  private updatePage(page: number) {
    return this.queryParamsSubject.next({
      ...this.queryParamsSubject.value,
      pageNumber: page
    });
  }
}
