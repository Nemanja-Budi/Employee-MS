import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { AuditlogService } from 'src/app/admin/auditlogs/auditlog.service';
import { SharedService } from '../shared.service';

@Directive({
  selector: '[appChangeInputType]'
})
export class ChangeInputTypeDirective{

  auditLogService: AuditlogService = inject(AuditlogService);
  sharedService: SharedService = inject(SharedService);
  private currentType: string = this.sharedService.witchType.value;


  @Input('appChangeInputType') 
  set type(value: string) {
    if (this.currentType !== value) {
      this.currentType = value;
      console.log(this.currentType);
      let proba = this.sharedService.isChange.value;
      if(proba == true) {
        this.sharedService.isChange.next(false);
      } else if(proba == false) {
        this.sharedService.isChange.next(true);
      }
      console.log(proba);

      this.clearValue();
      console.log(this.currentType)
    } else {
      // this.sharedService.isChange.next(false);
    
    }
  }
      // this.auditLogService.auditLogSearchSubject.next('');

  constructor(private el: ElementRef) {}



  private clearValue(): void {
    const input = this.el.nativeElement as HTMLInputElement;
    input.value = '';
    // this.sharedService.isChange.next(false);
  }

}
