import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPagesComponent } from './main-pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoEquiposComponent } from './equipos/listado-equipos/listado-equipos.component';
import { BBDDComponent } from './configuracion/bbdd/bbdd.component';
import { DashboardSettingsComponent } from './configuracion/dashboard-settings/dashboard-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: MainPagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Inicio' },
        pathMatch: 'full',
      },
      {
        path: 'listado-equipos',
        component: ListadoEquiposComponent,
        data: { titulo: 'Equipos' },
      },
      {
        path: 'configuracion-bbdd',
        component: BBDDComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Configuración-BBDD' },
      },
      {
        path: 'configuracion-dashboard',
        component: DashboardSettingsComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Configuración-Dashboard' },
      },
      {
        path: 'configuracion-usuarios',
        component: UsuariosComponent,
        canActivate: [AdminGuard],
        data: { titulo: 'Configuración-Usuarios' },
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
