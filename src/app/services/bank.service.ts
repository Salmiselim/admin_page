import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>('http://localhost:8080/bank');
  }

  addBank(bankData: Bank): Observable<any> {
      return this.http.post<any>('http://localhost:8080/bank', bankData);
  }
  updateBankState(code: string, deleted: boolean): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/bank/${code}/state?deleted=${deleted}`, null);
  }
  deleteBank(code: string): Observable<any> {
    return this.updateBankState(code, true);
  }

  getBankById(id: any): Observable<Bank> {
    return this.http.get<Bank>(`http://localhost:8080/bank/${id}`);
  }

  updateBank(code: string, bankData: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/bank/${code}`, bankData);
  }
}
