import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    
    this.router.navigate(['/login']);
    return false;
  }
}

// Guard específico para roles
@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(expectedRole: string): boolean {
    const userRole = this.authService.getUserRole();
    
    if (userRole === expectedRole) {
      return true;
    }
    
    this.router.navigate(['/dashboard']);
    return false;
  }
}