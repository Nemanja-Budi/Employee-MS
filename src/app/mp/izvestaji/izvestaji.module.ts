import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IzvestajiComponent } from './izvestaji.component';
import { IzvestajiRoutingModule } from './izvestaji-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    IzvestajiComponent
  ],
  imports: [
    CommonModule,
    IzvestajiRoutingModule,
    SharedModule
  ]
})
export class IzvestajiModule { }
