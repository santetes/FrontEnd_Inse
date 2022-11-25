import { Component, OnInit } from '@angular/core';

// Esto siguiente es una función declarada en el custom.js para que cargue correctamente el script de la plantilla.
// Se ejecuta en el própio script y en este componente principal
declare function funcionIniciadoraScriptCustomJs(): any;

@Component({
  selector: 'app-main-pages',
  templateUrl: './main-pages.component.html',
  styles: [],
})
export class MainPagesComponent implements OnInit {
  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();
  }
  anyo: number = new Date().getFullYear();
}
