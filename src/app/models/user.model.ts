export interface User {
  id?: string;
  nombre: string;
  apellido?: string;
  nit?: string;
  correo: string;
  role: 'empresa' | 'visitante';
  token?: string;
}

export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface RegisterEmpresaRequest {
  nombre: string;
  nit: string;
  correo: string;
  contrasena: string;
}

export interface RegisterVisitanteRequest {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
}
