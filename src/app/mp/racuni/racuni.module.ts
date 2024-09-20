import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacuniComponent } from './racuni.component';
import { RacuniRoutingModule } from './racuni-routing.module';



@NgModule({
  declarations: [
    RacuniComponent,
  ],
  imports: [
    CommonModule,
    RacuniRoutingModule
  ]
})
export class RacuniModule { }
