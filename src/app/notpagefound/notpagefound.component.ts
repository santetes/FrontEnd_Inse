import { Component, OnInit } from '@angular/core';

declare function funcionIniciadoraScriptCustomJs(): any;

@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: ['./notpagefound.component.css'],
})
export class NotpagefoundComponent implements OnInit {
  ngOnInit(): void {
    funcionIniciadoraScriptCustomJs();
  }
}
