import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  navegarIbv() {
    // window.location.href = 'https://www.ibv.org/';
    this.router.navigateByUrl('/');
  }
}
