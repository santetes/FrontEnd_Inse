import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private menuUsuario = [
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
      icono: 'mdi mdi-package-variant-closed',
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

  get getMenuUsuario() {
    return [...this.menuUsuario];
  }

  constructor() {}
}
