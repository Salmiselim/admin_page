import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appelfond } from '../models/appelfond';

@Injectable({
  providedIn: 'root'
})
export class AppelfondService {

  constructor(private http: HttpClient) { }

  getAF(): Observable<Appelfond[]> {
    return this.http.get<Appelfond[]>('http://localhost:8080/appelfond');
  }

  updateStatus(id: number, newStatus: string): Observable<Appelfond> {
    return this.http.put<Appelfond>(`http://localhost:8080/appelfond/${id}/status`, { status: newStatus });
  }
  updateLivrerState(id: number, newLivrerState: boolean): Observable<Appelfond> {
    return this.http.put<Appelfond>(`http://localhost:8080/appelfond/${id}/livrer`, { livrer: newLivrerState });
  }
}

