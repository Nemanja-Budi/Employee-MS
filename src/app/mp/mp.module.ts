import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpComponent } from './mp.component';
import { MpRoutingModule } from '../mp/mp-routing.module';


@NgModule({
  declarations: [
    MpComponent
  ],
  imports: [
    CommonModule,
    MpRoutingModule
  ]
})
export class MpModule { }
