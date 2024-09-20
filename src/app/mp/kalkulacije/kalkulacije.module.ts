import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KalkulacijeRoutingModule } from './kalkulacije-routing.module';
import { KalkulacijeComponent } from './kalkulacije.component';



@NgModule({
  declarations: [
    KalkulacijeComponent
  ],
  imports: [
    CommonModule,
    KalkulacijeRoutingModule
  ]
})
export class KalkulacijeModule { }
