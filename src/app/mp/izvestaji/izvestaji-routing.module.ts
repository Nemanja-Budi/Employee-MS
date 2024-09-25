import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IzvestajiComponent } from './izvestaji.component';
import { IzvestajPdfComponent } from './izvestaj-pdf/izvestaj-pdf.component';

const routes: Routes = [
    { path: '', redirectTo: 'all-izvestaji', pathMatch: 'full' },
    { path: 'all-izvestaji', component: IzvestajiComponent },
    { path: 'izvestaj', component: IzvestajPdfComponent },
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
export class IzvestajiRoutingModule { }
