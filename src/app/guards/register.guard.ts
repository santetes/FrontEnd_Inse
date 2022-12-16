import { Injectable } from '@angular/core';
import { DashconfigService } from '../services/configuracion/dashconfig.service';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(
    private dashconfigService: DashconfigService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.dashconfigService.getOptions.manualLoginReg) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
