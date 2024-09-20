import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpremniceComponent } from './otpremnice.component';
import { OtpremniceRoutingModule } from './otpremnice-routing.module';



@NgModule({
  declarations: [
    OtpremniceComponent,
  ],
  imports: [
    CommonModule,
    OtpremniceRoutingModule
  ]
})
export class OtpremniceModule { }
