import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      nombre: ['Santos', [Validators.required]],
      email: ['sanmarti@ibv.org', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    },
    {
      validators: this.validarContrasegnas('password', 'password2'),
    }
  );

  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();
  }

  constructor(private fb: FormBuilder) {}

  crearUsuario() {
    this.registerSubmited = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('posteando formulario');
    } else {
      console.log('formulario no posteado');
    }
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
