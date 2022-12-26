import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  RegisterForm,
  LoginForm,
  ActualizacionForm,
} from '../interfaces/usuarioForm.interface';
import { map, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { ValidacionUsuario } from '../interfaces/validacionUsuario';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private _usuario!: Usuario;
  private _usuarios!: Usuario[];

  get getUsuario() {
    return { ...this._usuario };
  }

  get getUsuarios() {
    return [...this._usuarios];
  }

  constructor(private http: HttpClient, private router: Router) {}

  getListadoUsuario() {
    const token = localStorage.getItem('x-token') || '';

    return this.http.get(`${base_url}/user`, {
      headers: { 'x-token': token },
    });
  }

  validarToken() {
    // inicion el servicion signIn de google desde el dashboard para que se pueda hacer logOut sin haber pasado
    // por la página del logIn
    google.accounts.id.initialize({
      client_id:
        '185565648798-drc4eltidrm0lek78613fgaq01jlnqik.apps.googleusercontent.com',
    });

    const token = localStorage.getItem('x-token') || '';

    return this.http
      .get<ValidacionUsuario>(`${base_url}/auth/renew`, {
        headers: { 'x-token': token },
      })
      .pipe(
        tap((resp) => {
          // creamos el usuario en el servicio con la respuesta de la validación
          this._usuario = this.creaInstanciaUsuario(resp);

          localStorage.setItem('x-token', resp.jwt);
        }),
        map((resp) => true),
        catchError((err) => of(false))
      );
  }

  creaInstanciaUsuario(resp: ValidacionUsuario) {
    const { nombre, email, estado, google, role, img, uid } = resp.usuario;

    return new Usuario(nombre, email, estado, '', google, role, img, uid);
  }

  // ----------------------------------

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/user`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('x-token', resp.jwt);
      })
    );
  }

  actualizarUsuario(data: ActualizacionForm, id: string | undefined) {
    return this.http.put(`${base_url}/user/${id}`, data, {
      headers: { 'x-token': localStorage.getItem('x-token') || '' },
    });
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
    localStorage.removeItem('x-token');

    google.accounts.id.revoke(this._usuario.email, () => {
      this.router.navigateByUrl('/login');
    });
  }
}
