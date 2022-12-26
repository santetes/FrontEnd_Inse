export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  nombre: string;
  email: string;
  password: string;
  password2: string;
}

export interface ActualizacionForm {
  nombre: string;
  email: string;
  role: string;
  estado: boolean;
}
