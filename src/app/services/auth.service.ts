import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, LoginRequest, RegisterEmpresaRequest, RegisterVisitanteRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Cargar usuario del localStorage al iniciar
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  registerEmpresa(data: RegisterEmpresaRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/empresa`, data).pipe(
      tap((response: any) => {
        if (response.token) {
          this.handleAuthResponse(response);
        }
      })
    );
  }

  registerVisitante(data: RegisterVisitanteRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/visitante`, data).pipe(
      tap((response: any) => {
        if (response.token) {
          this.handleAuthResponse(response);
        }
      })
    );
  }

  login(data: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        if (response.token) {
          this.handleAuthResponse(response);
        }
      })
    );
  }

  private handleAuthResponse(response: any): void {
    const user: User = response.user;
    user.token = response.token;
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', response.token);
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
  }
}