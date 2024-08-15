import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-enter-per-page',
  templateUrl: './enter-per-page.component.html',
  styleUrls: ['./enter-per-page.component.css']
})
export class EnterPerPageComponent {

  @Input() valueAfterReset: number = 1;
  @Input({required: true}) queryParamsSubject!: BehaviorSubject<any>;
  
  private updateQueryParams(params: any): void {
    if (this.queryParamsSubject) {
      const employeFilterDto = { ...this.queryParamsSubject.value.employeFilterDto };
      const commonFilter = { ...this.queryParamsSubject.value.commonFilter }
      this.queryParamsSubject.next({
        ...this.queryParamsSubject.value,
        employeFilterDto: employeFilterDto,
        commonFilter: {
          ...commonFilter,
          ...params
        }
      });
    }
  }

  showItemsPerPage(itemsPerPage: string): void {
    const pageSize = itemsPerPage === '' ? this.valueAfterReset : Number(itemsPerPage);
    this.updateQueryParams({ pageNumber: 1, pageSize: pageSize });
  }
}
