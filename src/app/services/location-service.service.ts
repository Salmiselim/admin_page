import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
  private apiUrl = 'http://localhost:8080/locations';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }

  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiUrl, location).pipe(
      map(response => response as Location),
      catchError(error => {
        if (error.status === 201) {
          console.log('Location created successfully', error);
          return of(error.error);
        }
        console.error('Error adding location', error);
        throw error;
      })
    );
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOptimalRoute(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}/optimalRoute`);
  }
}
