import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/api/empresa';

  constructor(private http: HttpClient) { }

  // Endpoints públicos
  getAllCompanies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresas`);
  }

  getCompanyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/empresas/${id}`);
  }

  // Endpoints protegidos (solo empresa)
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