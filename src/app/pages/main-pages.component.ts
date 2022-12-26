import { Component, OnInit } from '@angular/core';
import { ModalUsuarioService } from '../services/modals/modal-usuario.service';

// Esto siguiente es una función declarada en el custom.js para que cargue correctamente el script de la plantilla.
// Se ejecuta en el própio script y en este componente principal
declare function funcionIniciadoraScriptCustomJs(): any;
declare const google: any;

@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styles: [],
})
export class MainPagesComponent implements OnInit {
  anyo: number = new Date().getFullYear();
  get getMostrarModalUsuario() {
    return this.modalUsuarioService.mostrarModal;
  }

  constructor(private modalUsuarioService: ModalUsuarioService) {}

  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();

    // inicion el servicion signIn de google desde el dashboard para que se pueda hacer logOut sin haber pasado
    // por la página del logIn
    google.accounts.id.initialize({
      client_id:
        '185565648798-drc4eltidrm0lek78613fgaq01jlnqik.apps.googleusercontent.com',
      callback: (response: any) => {},
    });
  }
}
