import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responsable } from '../models/responsable';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {
  private baseUrl = 'http://localhost:8080/responsables';

  constructor(private http: HttpClient) { }

  getResponsablesList(): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(`${this.baseUrl}`);
  }

  getResponsableById(id: number): Observable<Responsable> {
    return this.http.get<Responsable>(`${this.baseUrl}/${id}`);
  }

  createResponsable(responsable: Responsable): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, responsable);
  }

  updateResponsable(id: number, responsable: Responsable): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, responsable);
  }

  deleteResponsable(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
