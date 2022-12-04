import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/registerForm.interface';
import { LoginForm } from '../interfaces/loginForm.interface';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  validarToken() {
    const token = localStorage.getItem('x-token') || '';

    return this.http
      .get(`${base_url}/auth/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('x-token', resp.jwt);
        })
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/user`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('x-token', resp.jwt);
      })
    );
  }

  loginUsuario(formData: LoginForm) {
    return this.http.post(`${base_url}/auth/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('x-token', resp.jwt);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http
      .post(`${base_url}/auth/google`, {
        id_token_google: token,
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('x-token', resp.jwt);
        })
      );
  }

  logOut() {
    // TODO: indicar en el email para el revoke el usuario.email
    localStorage.removeItem('x-token');
    google.accounts.id.revoke('sanmarti@ibv.org', () => {
      this.router.navigateByUrl('/login');
    });
  }
}
