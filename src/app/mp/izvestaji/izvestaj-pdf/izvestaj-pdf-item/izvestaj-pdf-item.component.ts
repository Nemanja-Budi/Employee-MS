import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GrupniIzvestaj } from 'src/app/models/mp/izvestaji/grupni.izvestaj.model';
import { PojedinacniIzvestaj } from 'src/app/models/mp/izvestaji/pojedinacni.izvestaj.model';
import { IzvestajiService } from '../../izvestaji.service';

@Component({
  selector: 'app-izvestaj-pdf-item',
  templateUrl: './izvestaj-pdf-item.component.html',
  styleUrls: ['./izvestaj-pdf-item.component.css']
})
export class IzvestajPdfItemComponent {

  izvestajiService: IzvestajiService = inject(IzvestajiService);
  router: Router = inject(Router);
  
  @Input() showCols: boolean = false;
  
  pojedinacniIzvestaj: PojedinacniIzvestaj | null = this.izvestajiService.pojedinacniIzvestaj.value;
  grupniIzvestaj: GrupniIzvestaj | null = this.izvestajiService.grupniIzvestaj.value;
  ukupanZbir: number = 0;

  sumRazlikaVrednosti() {
    if(this.grupniIzvestaj == null) return;
    this.ukupanZbir = this.grupniIzvestaj.izvestaj.reduce((acc, l) => {
      return acc + (l.razlikaVrednosti || 0);
    }, 0);
  }

  ngOnInit(): void {
    if(this.grupniIzvestaj == null && this.pojedinacniIzvestaj == null) {
      this.router.navigate(['/mp/izvestaji/all-izvestaji']);
    }
    if(this.grupniIzvestaj !== null) {
      this.sumRazlikaVrednosti();
    }
  }
}
