import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GrupniIzvestaj } from 'src/app/models/mp/izvestaji/grupni.izvestaj.model';
import { PojedinacniIzvestaj } from 'src/app/models/mp/izvestaji/pojedinacni.izvestaj.model';

@Injectable({
  providedIn: 'root'
})
export class IzvestajiService {

  pojedinacniIzvestaj: BehaviorSubject<PojedinacniIzvestaj | null> = new BehaviorSubject<PojedinacniIzvestaj | null>(null);
  grupniIzvestaj: BehaviorSubject<GrupniIzvestaj | null> = new BehaviorSubject<GrupniIzvestaj | null>(null);
  endDate: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  getIzvestaj(sifra: string, startDate: Date, endDate: Date): Observable<PojedinacniIzvestaj> {
    return this.http.get<PojedinacniIzvestaj>(`http://localhost:5000/api/mp/izvestaj/promet-izvestaj?sifra=${sifra}&startDate=${startDate}&endDate=${endDate}`);
  }

  getIzvestaji(startDate: Date, endDate: Date): Observable<GrupniIzvestaj> {
    return this.http.get<GrupniIzvestaj>(`http://localhost:5000/api/mp/izvestaj/izvestaj?startDate=${startDate}&endDate=${endDate}`);
  }
}