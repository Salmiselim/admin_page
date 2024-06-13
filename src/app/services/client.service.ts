import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/client';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  addClient(clientData: Client): Observable<any> {
    return this.http.post<any>(this.baseUrl, clientData)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteClient(code: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${code}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getClientById(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getClientsWithoutCode(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/clientsWithoutCode`)
      .pipe(
        catchError(this.handleError)
      );
  }

  setCode(code: string, newCode: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/clients/${code}`, newCode)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError('Something bad happened; please try again later.');
  }
}
