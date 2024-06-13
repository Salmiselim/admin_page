import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private loginUrl = 'http://localhost:8080/admin/login';

  constructor(private http: HttpClient) { }

  login(admin: Admin  ): Observable<any> {
    return this.http.post<any>(this.loginUrl, admin);
  }
}
