import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IzvestajiComponent } from './izvestaji.component';
import { IzvestajiRoutingModule } from './izvestaji-routing.module';



@NgModule({
  declarations: [
    IzvestajiComponent
  ],
  imports: [
    CommonModule,
    IzvestajiRoutingModule
  ]
})
export class IzvestajiModule { }
