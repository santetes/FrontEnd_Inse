import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DashconfigService } from '../../services/dashconfig.service';
import { UsuarioService } from '../../services/usuario.service';

declare function funcionIniciadoraScriptCustomJs(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public mostrarLogin!: boolean;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('user_1@user.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('123456', [Validators.required]),
  });

  public formSubmited: boolean = false;

  constructor(
    private dashconfigService: DashconfigService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();
    // Comprobamos si debemos mostrar tanto los campos de login manual cómo el enlace a la página de registro
    this.mostrarLogin = this.dashconfigService.getOptions.manualLoginReg;
  }

  login() {
    this.formSubmited = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.usuarioService.loginUsuario(this.loginForm.value).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          timer: 1500,
          title: resp.msg,
          showConfirmButton: false,
        }).then((algo) => {
          this.router.navigateByUrl('/');
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
    // this.router.navigateByUrl('/');
  }

  validarCampo(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmited) {
      return true;
    }
    return false;
  }
}
