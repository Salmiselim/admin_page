import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Echange } from '../models/echange';

@Injectable({
  providedIn: 'root'
})
export class EchangeService {
  private apiUrl = 'http://localhost:8080/echange';

  constructor(private http: HttpClient) { }

  getAllEchanges(): Observable<Echange[]> {
    return this.http.get<Echange[]>(`${this.apiUrl}`);
  }

  getEchangeById(id: number): Observable<Echange> {
    return this.http.get<Echange>(`${this.apiUrl}/${id}`);
  }

  saveEchange(echange: Echange): Observable<Echange> {
    return this.http.post<Echange>(this.apiUrl, echange);
  }

  updateEchangeStatus(id: number, status: string): Observable<Echange> {
    return this.http.put<Echange>(`${this.apiUrl}/${id}/status`, { status });
  }

  updateEchangeLivrerState(id: number, livrer: boolean): Observable<Echange> {
    return this.http.put<Echange>(`${this.apiUrl}/${id}/livrer`, { livrer });
  }

  deleteEchange(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
