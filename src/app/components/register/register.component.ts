// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userType: 'empresa' | 'visitante' = 'empresa';
  registerData: any = {
    nombre: '',
    apellido: '',
    nit: '',
    correo: '',
    contrasena: ''
  };
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const data = { ...this.registerData };
    
    if (this.userType === 'empresa') {
      // Eliminar campos de visitante
      delete data.apellido;
      this.authService.registerEmpresa(data).subscribe({
        next: (response) => {
          this.successMessage = 'Registro exitoso. Redirigiendo...';
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al registrar empresa';
          this.isLoading = false;
        }
      });
    } else {
      // Eliminar campo NIT
      delete data.nit;
      this.authService.registerVisitante(data).subscribe({
        next: (response) => {
          this.successMessage = 'Registro exitoso. Redirigiendo...';
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al registrar visitante';
          this.isLoading = false;
        }
      });
    }
  }
}