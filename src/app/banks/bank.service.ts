import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bank } from '../models/bank/bank.model';
import { EmployeBank } from '../models/bank/employe.bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  editBank: BehaviorSubject<Bank | null> = new BehaviorSubject<Bank | null>(null);

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

  addBank(bank: Bank): Observable<Bank> {
    return this.http.post<Bank>(`http://localhost:5000/api/bank/create-bank`, bank);
  }

  editsBank(bank: Bank): Observable<Bank> {
    return this.http.put<Bank>(`http://localhost:5000/api/bank/update-bank/${bank.id}`, bank);
  }

  deleteBank(bankId: string): Observable<string> {
    return this.http.delete<string>(`http://localhost:5000/api/bank/delete-bank/${bankId}`);
  }
}
