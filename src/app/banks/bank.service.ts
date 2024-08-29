import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank/bank.model';
import { EmployeBank } from '../models/bank/employe.bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }
  

  getAllBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(`http://localhost:5000/api/bank/get-banks`);
  }

  getBanksForEmployes(): Observable<EmployeBank[]> {
    return this.http.get<EmployeBank[]>(`http://localhost:5000/api/bank/get-banks`);
  }

  getBankForEmploye(bankId: string): Observable<EmployeBank[]> {
    return this.http.get<EmployeBank[]>(`http://localhost:5000/api/bank/get-bank-for-employe/${bankId}`);
  }
}
