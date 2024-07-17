import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnnualLeave } from 'src/app/models/annual-leaves/annual.leave.model';

@Injectable({
  providedIn: 'root'
})
export class AnnualleaveService {

  constructor(private http: HttpClient) { }

  getAllAnnualLeave(): Observable<AnnualLeave[]> {
    return this.http.get<AnnualLeave[]>(`http://localhost:5000/api/annualleave/get-annualleaves`);
  }

}
