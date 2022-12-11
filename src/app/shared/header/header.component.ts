import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public usuario!: Usuario;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.getUsuario;
  }

  logOut() {
    this.usuarioService.logOut();
  }
}
