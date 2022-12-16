import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { DashconfigService } from '../../services/configuracion/dashconfig.service';
import { UsuarioService } from '../../services/usuario.service';

declare function funcionIniciadoraScriptCustomJs(): any;
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public mostrarLoginManual!: boolean;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  public formSubmited: boolean = false;

  constructor(
    private dashconfigService: DashconfigService,
    private router: Router,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (!this.mostrarLoginManual) {
      this.googleInit();
    }
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '185565648798-drc4eltidrm0lek78613fgaq01jlnqik.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    // cuidado con el comportamiento del this tanto en la función mandada en el callback
    // como en this.usuario service de handleCredential. En el callback hay
    // que pasar la response por argumento para que el this de handleCredential
    // apunte a la instancia loginComponent
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large', shape: 'pill' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    const token = response.credential;
    this.usuarioService.loginGoogle(token).subscribe({
      next: (resp) => {
        Swal.fire({
          icon: 'success',
          timer: 1500,
          title: resp.msg,
          showConfirmButton: false,
        }).then((algo) => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
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

  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();
    // Comprobamos si debemos mostrar tanto los campos de login manual cómo el enlace a la página de registro
    this.mostrarLoginManual = this.dashconfigService.getOptions.manualLoginReg;
    // Comprobamos si existe mail almacenado por la opción recuerdaMe
    this.cargarMailLocalStorage();
  }

  cargarMailLocalStorage() {
    if (localStorage.getItem('email-rem')) {
      this.loginForm.get('rememberMe')?.setValue(true);
      this.loginForm.get('email')?.setValue(localStorage.getItem('email-rem'));
    }
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
        // función almacenaje mail rememberMe
        if (this.loginForm.get('rememberMe')?.value) {
          localStorage.setItem('email-rem', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email-rem');
        }
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
