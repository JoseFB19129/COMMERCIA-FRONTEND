import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/visitante';

  constructor(private http: HttpClient) { }

  getMyProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/perfil`);
  }

  updateMyProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/perfil`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cambiar-contrasena`, data);
  }

  deleteMyAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cuenta`);
  }
}