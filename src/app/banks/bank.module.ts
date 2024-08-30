import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksComponent } from './banks.component';
import { BanksRoutingModule } from './banks-routing.module';

@NgModule({
  declarations: [
    BanksComponent,
  ],
  imports: [
    CommonModule,
    BanksRoutingModule
  ]
})
export class BankModule { }
