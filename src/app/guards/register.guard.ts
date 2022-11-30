import { Injectable } from '@angular/core';
import { DashconfigService } from '../services/dashconfig.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private dashconfigService: DashconfigService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.dashconfigService.getOptions.manualLoginReg;
  }
}
