// src/app/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userRole: string | null = null;
  userData: any = {};
  isLoading = true;
  successMessage = '';
  errorMessage = '';
  isDeleting = false;
  
  passwordData = {
    contrasenaActual: '',
    nuevaContrasena: ''
  };

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    
    if (this.userRole === 'empresa') {
      this.companyService.getMyProfile().subscribe({
        next: (data) => {
          this.userData = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar el perfil';
          this.isLoading = false;
        }
      });
    } else {
      this.userService.getMyProfile().subscribe({
        next: (data) => {
          this.userData = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar el perfil';
          this.isLoading = false;
        }
      });
    }
  }

  updateProfile(): void {
    const updateData = {
      nombre: this.userData.nombre,
      correo: this.userData.correo
    };
    
    if (this.userRole === 'empresa') {
      updateData['nit'] = this.userData.nit;
      this.companyService.updateMyProfile(updateData).subscribe({
        next: (response) => {
          this.successMessage = 'Perfil actualizado exitosamente';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar perfil';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    } else {
      updateData['apellido'] = this.userData.apellido;
      this.userService.updateMyProfile(updateData).subscribe({
        next: (response) => {
          this.successMessage = 'Perfil actualizado exitosamente';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar perfil';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  changePassword(): void {
    if (!this.passwordData.contrasenaActual || !this.passwordData.nuevaContrasena) {
      this.errorMessage = 'Complete todos los campos';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }
    
    if (this.userRole === 'empresa') {
      this.companyService.changePassword(this.passwordData).subscribe({
        next: (response) => {
          this.successMessage = 'Contraseña cambiada exitosamente';
          this.passwordData = { contrasenaActual: '', nuevaContrasena: '' };
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al cambiar contraseña';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    } else {
      this.userService.changePassword(this.passwordData).subscribe({
        next: (response) => {
          this.successMessage = 'Contraseña cambiada exitosamente';
          this.passwordData = { contrasenaActual: '', nuevaContrasena: '' };
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al cambiar contraseña';
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  confirmDelete(): void {
    this.isDeleting = true;
    
    if (this.userRole === 'empresa') {
      this.companyService.deleteMyAccount().subscribe({
        next: () => {
          this.authService.logout();
          window.location.href = '/login';
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar cuenta';
          this.isDeleting = false;
        }
      });
    } else {
      this.userService.deleteMyAccount().subscribe({
        next: () => {
          this.authService.logout();
          window.location.href = '/login';
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar cuenta';
          this.isDeleting = false;
        }
      });
    }
  }
}