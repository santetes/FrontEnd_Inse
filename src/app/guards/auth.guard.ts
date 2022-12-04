import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.usuarioService.validarToken().pipe(
      map((resp: any) => resp.ok),
      catchError((err) => {
        console.log(err);
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );
  }
}
