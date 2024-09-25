import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IzvestajiComponent } from './izvestaji.component';
import { IzvestajiRoutingModule } from './izvestaji-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IzvestajPdfComponent } from './izvestaj-pdf/izvestaj-pdf.component';
import { IzvestajPdfItemComponent } from './izvestaj-pdf/izvestaj-pdf-item/izvestaj-pdf-item.component';



@NgModule({
  declarations: [
    IzvestajiComponent,
    IzvestajPdfComponent,
    IzvestajPdfItemComponent
  ],
  imports: [
    CommonModule,
    IzvestajiRoutingModule,
    SharedModule
  ]
})
export class IzvestajiModule { }
