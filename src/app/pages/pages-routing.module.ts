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
        pathMatch: 'full',
      },
      {
        path: 'listado-equipos',
        component: ListadoEquiposComponent,
      },
      {
        path: 'configuracion-bbdd',
        component: BBDDComponent,
      },
      {
        path: 'configuracion-dashboard',
        component: DashboardSettingsComponent,
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
