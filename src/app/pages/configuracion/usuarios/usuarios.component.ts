import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedaService } from '../../../services/busqueda.service';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { ModalUsuarioService } from '../../../services/modals/modal-usuario.service';

let subscription: Subscription;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private $subject: Subject<string> = new Subject();
  public usuarios!: Usuario[];
  private _todosUsuariosTemp!: Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService,
    private modalUsuarioService: ModalUsuarioService
  ) {}

  ngOnInit(): void {
    this.$subject
      .pipe(debounceTime(300))
      .subscribe((termino) => this.busqueda(termino));

    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getListadoUsuario().subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this._todosUsuariosTemp = resp.usuarios;
    });
  }

  ngOnDestroy(): void {
    this.$subject.unsubscribe();
  }

  teclaPresionada(termino: string) {
    this.$subject.next(termino);
  }

  busqueda(termino: any) {
    if (!termino) {
      this.usuarios = this._todosUsuariosTemp;
      return;
    }

    this.busquedaService
      .busquedaPorUsuario(termino)
      .subscribe((resp: any) => (this.usuarios = resp.resultado));
  }

  lanzarModal(user: Usuario, indice: number) {
    subscription = this.modalUsuarioService.lanzarModal(user).subscribe({
      next: (resp: any) => {
        if (resp.ok) {
          this.actualizaListadoUsuarios(resp.usuarioActualizado, indice);
        }
        subscription.unsubscribe();
      },
    });
  }

  actualizaListadoUsuarios(user: Usuario, indice: number) {
    this.usuarios.splice(indice, 1, user);
  }
}
