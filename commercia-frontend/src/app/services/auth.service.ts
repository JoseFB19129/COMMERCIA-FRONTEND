import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, User, UpdateProfile } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'token';
  private userKey = 'user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Registro empresa
  registerEmpresa(data: { nombre: string; nit: string; correo: string; contrasena: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/empresa`, data).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  // Registro visitante
  registerVisitante(data: { nombre: string; apellido: string; correo: string; contrasena: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/visitante`, data).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  // Login
  login(correo: string, contrasena: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { correo, contrasena }).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  // Actualizar perfil (según rol)
  updateProfile(data: UpdateProfile): Observable<any> {
    const url = this.isEmpresa() ? '/api/empresa/perfil' : '/api/visitante/perfil';
    return this.http.put(`http://localhost:3000${url}`, data);
  }

  // Cambiar contraseña
  changePassword(data: { contrasenaActual: string; nuevaContrasena: string }): Observable<any> {
    const url = this.isEmpresa() ? '/api/empresa/cambiar-contrasena' : '/api/visitante/cambiar-contrasena';
    return this.http.put(`http://localhost:3000${url}`, data);
  }

  // Eliminar cuenta (soft delete)
  deleteAccount(): Observable<any> {
    const url = this.isEmpresa() ? '/api/empresa/cuenta' : '/api/visitante/cuenta';
    return this.http.delete(`http://localhost:3000${url}`);
  }

  // Obtener perfil actual (desde el backend)
  getProfile(): Observable<any> {
    const url = this.isEmpresa() ? '/api/empresa/perfil' : '/api/visitante/perfil';
    return this.http.get(`http://localhost:3000${url}`);
  }

  // Helpers
  private handleAuthResponse(res: AuthResponse) {
    localStorage.setItem(this.tokenKey, res.token);
    localStorage.setItem(this.userKey, JSON.stringify(res.user));
    this.currentUserSubject.next(res.user);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isEmpresa(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'empresa';
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }
}