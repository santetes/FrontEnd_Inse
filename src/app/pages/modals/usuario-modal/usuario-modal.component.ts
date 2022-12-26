import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalUsuarioService } from '../../../services/modals/modal-usuario.service';
import { UsuarioService } from '../../../services/usuario.service';
import { of } from 'rxjs';

declare function funcionIniciadoraScriptCustomJs(): any;

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.css'],
})
export class UsuarioModalComponent implements OnInit, AfterViewInit {
  @ViewChild('roleSelect') roleSelect!: ElementRef;
  @ViewChild('estadoSelect') estadoSelect!: ElementRef;

  public formularioUsuario!: FormGroup;

  get getIsAutoEdition(): boolean {
    return this.modalUsuarioService.usuario.email ===
      this.usuarioService.getUsuario.email
      ? true
      : false;
  }

  get getIsUserGoogle() {
    return this.modalUsuarioService.usuario.google;
  }

  constructor(
    private modalUsuarioService: ModalUsuarioService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();
    this.cargarFormulario();
  }

  cargarFormulario() {
    const { nombre, role, email, estado } = this.modalUsuarioService.usuario;

    this.formularioUsuario = this.fb.group({
      nombre: [nombre, Validators.required],
      role: [role, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      estado: [estado, Validators.required],
    });
  }

  // Nos permite deshabilitar el select una vez cargado el role y el estado del usuario. sino se hace de esta forma, no se puede deshabilitar el select directamente tras cargar el valor del option.
  ngAfterViewInit(): void {
    if (this.getIsAutoEdition) {
      this.renderer2.setAttribute(
        this.roleSelect.nativeElement,
        'disabled',
        'true'
      );
      this.renderer2.setAttribute(
        this.estadoSelect.nativeElement,
        'disabled',
        'true'
      );
    }
  }

  campoEsValido(campo: string) {
    return (
      this.formularioUsuario.controls[campo].errors &&
      this.formularioUsuario.controls[campo].touched
    );
  }

  actualizarUsuario() {
    this.usuarioService
      .actualizarUsuario(
        this.formularioUsuario.value,
        this.modalUsuarioService.usuario.uid
      )
      .subscribe({
        next: (resp: any) => {
          Swal.fire({
            icon: 'success',
            timer: 1500,
            title: resp.msg,
            showConfirmButton: false,
          }).then((nada) => {
            this.modalUsuarioService.$subject.next(resp);
            this.modalUsuarioService.mostrarModal = false;
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.msg,
          });
        },
      });
  }

  cerrarModal() {
    this.modalUsuarioService.mostrarModal = false;
    this.modalUsuarioService.$subject.next(false);
  }
}
