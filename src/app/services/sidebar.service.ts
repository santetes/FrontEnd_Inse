import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private menuUsuario = [
    {
      nombre: 'Equipos',
      icono: 'mdi mdi-package-variant-closed',
      subCategorias: [
        {
          nombre: 'Listado',
          path: '/equipos',
        },
      ],
    },
  ];

  get getMenuUsuario() {
    return [...this.menuUsuario];
  }

  constructor() {}
}
