import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _usuario!: Usuario;

  private menuAdmin = [
    {
      nombre: 'Dashboard',
      icono: 'mdi mdi-home-outline',
      subCategorias: [
        {
          nombre: 'Main',
          path: '/dashboard',
        },
      ],
    },
    {
      nombre: 'Equipos',
      icono: 'mdi mdi-shape-plus',
      subCategorias: [
        {
          nombre: 'Listado',
          path: '/listado-equipos',
        },
      ],
    },
    {
      nombre: 'Configuración',
      icono: 'mdi mdi-settings',
      subCategorias: [
        {
          nombre: 'Dashboard',
          path: '/configuracion-dashboard',
        },
        {
          nombre: 'BBDD',
          path: '/configuracion-bbdd',
        },
      ],
    },
  ];

  private menuUser = [
    {
      nombre: 'Dashboard',
      icono: 'mdi mdi-home-outline',
      subCategorias: [
        {
          nombre: 'Main',
          path: '/dashboard',
        },
      ],
    },
    {
      nombre: 'Equipos',
      icono: 'mdi mdi-shape-plus',
      subCategorias: [
        {
          nombre: 'Listado',
          path: '/listado-equipos',
        },
      ],
    },
  ];

  get getMenu() {
    this._usuario = this.usuarioService.getUsuario;
    switch (this._usuario.role) {
      case 'ADMIN_ROLE':
        return [...this.menuAdmin];

      case 'USER_ROLE':
        return [...this.menuUser];

      default:
        return [...this.menuUser];
    }
  }

  constructor(private usuarioService: UsuarioService) {}
}
