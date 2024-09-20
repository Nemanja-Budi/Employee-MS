import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpComponent } from './mp.component';
import { MpRoutingModule } from '../mp/mp-routing.module';
import { MpNavbarComponent } from './mp-navbar/mp-navbar.component';
import { SharedModule } from '../shared/shared.module';
import { RacuniComponent } from './racuni/racuni.component';


@NgModule({
  declarations: [
    MpComponent,
    MpNavbarComponent,
  ],
  imports: [
    CommonModule,
    MpRoutingModule,
    SharedModule
  ]
})
export class MpModule { }
