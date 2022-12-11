import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role',
})
export class RolePipe implements PipeTransform {
  transform(role: string | undefined): string {
    switch (role) {
      case 'ADMIN_ROLE':
        return 'Administrador';
      case 'GESTOR_ROLE':
        return 'Gestor';
      case 'USER_ROLE':
        return 'Usuario';
      default:
        return 'No role';
    }
  }
}
