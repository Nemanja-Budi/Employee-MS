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
  
    const skipSifra = this.datumIzvestajiForm.value['skipSifra'];
    let sifra = this.datumIzvestajiForm.value['sifra'];
    let startDate = this.datumIzvestajiForm.value['startDate'];
    const endDate = this.datumIzvestajiForm.value['endDate'];
  
    if (startDate == "") {
      startDate = '2024-01-01';
    }
  
    if (skipSifra) {
      this.izvestajiService.getIzvestaji(startDate, endDate).subscribe({
        next: (response) => {
          this.izvestajiService.pojedinacniIzvestaj.next(null);
          this.izvestajiService.grupniIzvestaj.next(response);
          this.setDateAndNavigate(endDate);
        },
        error: (e) => console.error(e)
      });
    } else {
      this.izvestajiService.getIzvestaj(sifra, startDate, endDate).subscribe({
        next: (response) => {
          this.izvestajiService.grupniIzvestaj.next(null);
          this.izvestajiService.pojedinacniIzvestaj.next(response);
          this.setDateAndNavigate(endDate);
        },
        error: (e) => console.error(e)
      });
    }
  }
  
  private setDateAndNavigate(endDate: string): void {
    this.izvestajiService.endDate.next(endDate);
    this.router.navigate(['/mp/izvestaji/izvestaj']);
  }
}
