import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  tipo: 'empresa' | 'visitante' = 'visitante';
  nombre = '';
  apellido = '';
  nit = '';
  correo = '';
  contrasena = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.tipo === 'empresa') {
      this.authService.registerEmpresa({
        nombre: this.nombre,
        nit: this.nit,
        correo: this.correo,
        contrasena: this.contrasena
      }).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => this.errorMsg = err.error?.message || 'Error al registrar empresa'
      });
    } else {
      this.authService.registerVisitante({
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        contrasena: this.contrasena
      }).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => this.errorMsg = err.error?.message || 'Error al registrar visitante'
      });
    }
  }
}