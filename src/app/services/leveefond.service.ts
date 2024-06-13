import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leveefond } from '../models/leveefond';

@Injectable({
  providedIn: 'root'
})
export class LeveefondService {
  private baseUrl = 'http://localhost:8080/leveefond';

  constructor(private http: HttpClient) { }

  getLV(): Observable<Leveefond[]> {
    return this.http.get<Leveefond[]>(this.baseUrl);
  }

  findLeveefondById(id: number): Observable<Leveefond> {
    return this.http.get<Leveefond>(`${this.baseUrl}/${id}`);
  }

  findLeveefondsByClientCode(clientCode: string): Observable<Leveefond[]> {
    return this.http.get<Leveefond[]>(`${this.baseUrl}/client/${clientCode}`);
  }

  saveLeveefond(leveefond: Leveefond): Observable<Leveefond> {
    return this.http.post<Leveefond>(this.baseUrl, leveefond);
  }

  updateLeveefond(id: number, leveefond: Leveefond): Observable<Leveefond> {
    return this.http.put<Leveefond>(`${this.baseUrl}/${id}`, leveefond);
  }

  deleteLeveefond(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateStatus(id: number, newStatus: string): Observable<Leveefond> {
    return this.http.put<Leveefond>(`${this.baseUrl}/${id}/status`, { newStatus });
  }

  updateLivrerState(id: number, newLivrerState: boolean): Observable<Leveefond> {
    // Ensure the request body matches the expected format of the backend
    return this.http.put<Leveefond>(`${this.baseUrl}/${id}/livrer`, { livrer: newLivrerState });
  }
}
