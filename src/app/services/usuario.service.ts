import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/loginForm.interface';
import { tap } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/user`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('x-token', resp.jwt);
      })
    );
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('x-token', resp.jwt);
      })
    );
  }
}
