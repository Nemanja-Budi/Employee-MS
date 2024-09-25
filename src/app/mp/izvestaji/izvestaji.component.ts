import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GrupniIzvestaj } from 'src/app/models/mp/izvestaji/grupni.izvestaj.model';
import { PojedinacniIzvestaj } from 'src/app/models/mp/izvestaji/pojedinacni.izvestaj.model';
import { IzvestajiService } from './izvestaji.service';

@Component({
  selector: 'app-izvestaji',
  templateUrl: './izvestaji.component.html',
  styleUrls: ['./izvestaji.component.css']
})
export class IzvestajiComponent {

  izvestajiService: IzvestajiService = inject(IzvestajiService);

  router: Router = inject(Router);
  
  // pojedinacniIzvestaj!: PojedinacniIzvestaj;
  // grupniIzvestaj!: GrupniIzvestaj;
  datumIzvestajiForm: FormGroup;
  
  @ViewChild('preview', { static: true }) preview!: ElementRef<HTMLDialogElement>;  

  constructor(private fb: FormBuilder) {
    this.datumIzvestajiForm = this.fb.group({
      skipSifra: [false],
      sifra: ['', [Validators.pattern('^[0-9]+$')]],
      startDate: [''],
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (!this.datumIzvestajiForm.valid) return;
  
    const skipSifra = this.datumIzvestajiForm.value['skipSifra']; // Provera da li je checkbox označen
    let sifra = this.datumIzvestajiForm.value['sifra'];
    let startDate = this.datumIzvestajiForm.value['startDate'];
    const endDate = this.datumIzvestajiForm.value['endDate'];
  
    if (startDate == "") {
      startDate = '2024-01-01';
    }
  
    if (skipSifra) {
      this.izvestajiService.getIzvestaji(startDate, endDate).subscribe({
        next: (response) => {
          // this.grupniIzvestaj = response;
          this.izvestajiService.grupniIzvestaj.next(response);
          this.izvestajiService.endDate.next(endDate);
          this.router.navigate(['/mp/izvestaji/izvestaj']);
        },
        error: (e) => console.error(e)
      });
    } else {
      this.izvestajiService.getIzvestaj(sifra, startDate, endDate).subscribe({
        next: (response) => {
          // this.pojedinacniIzvestaj = response;
          this.izvestajiService.pojedinacniIzvestaj.next(response);
          this.izvestajiService.endDate.next(endDate);
          this.router.navigate(['/mp/izvestaji/izvestaj']);
        },
        error: (e) => console.error(e)
      });
    }
  }
  
}
