import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPagesComponent } from './main-pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoEquiposComponent } from './equipos/listado-equipos/listado-equipos.component';
import { BBDDComponent } from './configuracion/bbdd/bbdd.component';
import { DashboardSettingsComponent } from './configuracion/dashboard-settings/dashboard-settings.component';

const routes: Routes = [
  {
    path: '',
    component: MainPagesComponent,
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
        data: { titulo: 'Configuración-BBDD' },
      },
      {
        path: 'configuracion-dashboard',
        component: DashboardSettingsComponent,
        data: { titulo: 'Configuración-Dashboard' },
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
