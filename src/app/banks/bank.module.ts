import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksComponent } from './banks.component';
import { BanksRoutingModule } from './banks-routing.module';
import { BankAddComponent } from './bank-add/bank-add.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BanksComponent,
    BankAddComponent
  ],
  imports: [
    CommonModule,
    BanksRoutingModule,
    SharedModule
  ]
})
export class BankModule { }
