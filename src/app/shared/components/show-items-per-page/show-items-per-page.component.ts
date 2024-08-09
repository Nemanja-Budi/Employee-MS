import { Component, inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-show-items-per-page',
  templateUrl: './show-items-per-page.component.html',
  styleUrls: ['./show-items-per-page.component.css']
})
export class ShowItemsPerPageComponent {

  @Input() itemsPerPage: number[] = [];
  @Input() textColor: string = '';
  @Input() bgButton: string = '';
  @Input() hbutton: number = 0;
  @Input({required: true}) queryParamsSubject!: BehaviorSubject<any>;
  @Input({required: true}) valueAfterReset: number = 0;

  isAscending: boolean = true;

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

  getCurrentPageSize(): number {
    return this.queryParamsSubject ? this.queryParamsSubject.value.commonFilter.pageSize : -1;
  }

  onChangeSortDirection(): void {
    this.isAscending = !this.isAscending;
    console.log(this.isAscending);
    this.updateQueryParams({ isAscending: this.isAscending });
  }

  onChangeItemPerPage(item: number): void {
    this.updateQueryParams({ pageNumber: 1, pageSize: item });
  }

  showItemsPerPage(itemsPerPage: string): void {
    const pageSize = itemsPerPage === '' ? this.valueAfterReset : Number(itemsPerPage);
    this.updateQueryParams({ pageNumber: 1, pageSize: pageSize });
  }

  updateParam(paramName: string, value: any): void {
    const params = { [paramName]: value };
    this.updateQueryParams(params);
  }
}
