import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Miseadisposition } from '../models/miseadisposition';

@Injectable({
  providedIn: 'root'
})
export class MiseadispositionService {

  private apiUrl = 'http://localhost:8080/miseadisposition';

  constructor(private http: HttpClient) { }

  getAllMiseADispositions(): Observable<Miseadisposition[]> {
    return this.http.get<Miseadisposition[]>(`${this.apiUrl}`);
  }

  getMiseADispositionById(id: number): Observable<Miseadisposition> {
    return this.http.get<Miseadisposition>(`${this.apiUrl}/${id}`);
  }

  saveMiseADisposition(miseADisposition: Miseadisposition): Observable<Miseadisposition> {
    return this.http.post<Miseadisposition>(this.apiUrl, miseADisposition);
  }

  updateMiseADispositionStatus(id: number, status: string): Observable<Miseadisposition> {
    return this.http.put<Miseadisposition>(`${this.apiUrl}/${id}/status`, { status });
  }

  updateMiseADispositionLivrerState(id: number, livrer: boolean): Observable<Miseadisposition> {
    return this.http.put<Miseadisposition>(`${this.apiUrl}/${id}/livrer`, { livrer });
  }

  deleteMiseADisposition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
