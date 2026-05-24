import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = { nombre: '', correo: '', nit: '', apellido: '' };
  passwordData = { contrasenaActual: '', nuevaContrasena: '' };
  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userData = {
          nombre: user.nombre,
          correo: user.correo,
          nit: user.nit || '',
          apellido: user.apellido || ''
        };
      }
    });
  }

  updateProfile() {
    const updateData: any = {};
    if (this.userData.nombre) updateData.nombre = this.userData.nombre;
    if (this.userData.correo) updateData.correo = this.userData.correo;
    if (this.userData.nit) updateData.nit = this.userData.nit;
    if (this.userData.apellido) updateData.apellido = this.userData.apellido;

    this.authService.updateProfile(updateData).subscribe({
      next: (res) => {
        this.message = res.message;
        // Refrescar datos del usuario
        this.authService.getProfile().subscribe((updated: any) => {
          localStorage.setItem('user', JSON.stringify(updated));
          this.authService['currentUserSubject'].next(updated);
        });
        setTimeout(() => this.message = '', 3000);
      },
      error: (err) => this.error = err.error?.message || 'Error al actualizar'
    });
  }

  changePassword() {
    this.authService.changePassword(this.passwordData).subscribe({
      next: (res) => {
        this.message = res.message;
        this.passwordData = { contrasenaActual: '', nuevaContrasena: '' };
        setTimeout(() => this.message = '', 3000);
      },
      error: (err) => this.error = err.error?.message || 'Error al cambiar contraseña'
    });
  }

  deleteAccount() {
    if (confirm('¿Estás seguro? Esta acción desactivará tu cuenta permanentemente.')) {
      this.authService.deleteAccount().subscribe({
        next: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
        error: (err) => this.error = err.error?.message || 'Error al eliminar cuenta'
      });
    }
  }
}