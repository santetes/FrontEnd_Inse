import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public formSubmited: boolean = false;

  constructor(
    private dashconfigService: DashconfigService,
    private router: Router,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
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

    console.log('submited');
    this.usuarioService.loginUsuario(this.loginForm.value);
    // this.router.navigateByUrl('/');
  }

  validarCampo(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmited) {
      return true;
    }
    return false;
  }
}
