import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

declare function funcionIniciadoraScriptCustomJs(): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerSubmited: boolean = false;

  public registerForm = this.fb.group(
    {
      nombre: ['User_3', [Validators.required]],
      email: ['User_3@users.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
      password2: ['123456', [Validators.required]],
    },
    {
      validators: this.validarContrasegnas('password', 'password2'),
    }
  );

  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();
  }

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  crearUsuario() {
    this.registerSubmited = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
      next: (resp) => console.log(resp),
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
        });
      },
    });
  }

  validarCampo(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.registerSubmited) {
      return true;
    }
    return false;
  }

  // Logica para comprobar si dos campos del formGroup son inguales
  validarContrasegnas(campo1: string, campo2: string) {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if (pass1 === pass2) {
        formGroup.get(campo2)?.setErrors(null);
      } else {
        formGroup.get(campo2)?.setErrors({ noEsIgual: true });
      }
    };
  }
}
