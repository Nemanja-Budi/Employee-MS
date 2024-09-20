import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrijemniceComponent } from './prijemnice.component';
import { PrijemniceRoutingModule } from './prijemnice-routing.module';



@NgModule({
  declarations: [
    PrijemniceComponent
  ],
  imports: [
    CommonModule,
    PrijemniceRoutingModule
  ]
})
export class PrijemniceModule { }
