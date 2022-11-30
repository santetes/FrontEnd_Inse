import { Component, OnInit } from '@angular/core';
import { DashconfigService } from '../../services/dashconfig.service';

declare function funcionIniciadoraScriptCustomJs(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public mostrarLogin!: boolean;

  constructor(private dashconfigService: DashconfigService) {}

  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();
    // Comprobamos si debemos mostrar tanto los campos de login manual cómo el enlace a la página de registro
    this.mostrarLogin = this.dashconfigService.getOptions.manualLoginReg;
  }
}
