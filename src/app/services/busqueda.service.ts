import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const url = environment.base_url;
const token = localStorage.getItem('x-token') || '';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(private http: HttpClient) {}

  busquedaPorUsuario(termino: string) {
    return this.http.get(`${url}/busqueda/usuarios/${termino}`, {
      headers: { 'x-token': token },
    });
  }
}
