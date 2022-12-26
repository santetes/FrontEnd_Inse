import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ModalUsuarioService {
  public mostrarModal = false;
  public usuario!: Usuario;

  public $subject = new Subject();

  constructor() {}

  lanzarModal(usuario: Usuario) {
    this.usuario = usuario;
    this.mostrarModal = true;
    return this.$subject;
  }
}
