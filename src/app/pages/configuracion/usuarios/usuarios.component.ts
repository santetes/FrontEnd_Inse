import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedaService } from '../../../services/busqueda.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private _subject: Subject<string> = new Subject();
  public usuarios!: Usuario[];
  private _todosUsuarios!: Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService
  ) {}

  ngOnInit(): void {
    this._subject
      .pipe(debounceTime(300))
      .subscribe((termino) => this.busqueda(termino));

    this.usuarioService.getListadoUsuario().subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this._todosUsuarios = resp.usuarios;
    });
  }

  ngOnDestroy(): void {
    this._subject.unsubscribe();
  }

  teclaPresionada(termino: string) {
    this._subject.next(termino);
  }

  busqueda(termino: any) {
    if (!termino) {
      this.usuarios = this._todosUsuarios;
    }

    this.busquedaService
      .busquedaPorUsuario(termino)
      .subscribe((resp: any) => (this.usuarios = resp.resultado));
  }
}
