import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agence } from '../models/agence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  constructor(private http: HttpClient) { }

  getAgences(): Observable<Agence[]> {
    return this.http.get<Agence[]>('http://localhost:8080/agence');
  }

  changeAgencyState(code: number, deleted: boolean): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/agence/${code}/state?deleted=${deleted}`, null);
  }
  getDeletedAgencies(deleted: boolean = false): Observable<Agence[]> {
    return this.http.get<Agence[]>(`http://localhost:8080/agence?deleted=${deleted}`);
  }


  restoreAgence(code: Number): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/agence/${code}/state?deleted=false`, null);
  }
  addAgence(agenceData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/agence', agenceData);
  }
  updateAgency(code: number, agenceData: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/agence/${code}`, agenceData);
  }
  getAgencyById(id: number): Observable<Agence> {
    return this.http.get<Agence>(`http://localhost:8080/agence/${id}`);
  }
}
