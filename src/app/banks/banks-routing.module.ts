import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BanksComponent } from './banks.component';

const routes: Routes = [
    { path: '', redirectTo: 'bank', pathMatch: 'full' },
    { path: 'bank', component: BanksComponent },
  ];
  
  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class BanksRoutingModule { }
  