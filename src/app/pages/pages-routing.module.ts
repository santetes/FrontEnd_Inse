import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPagesComponent } from './main-pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EquiposComponent } from './equipos/equipos.component';

const routes: Routes = [
  {
    path: '',
    component: MainPagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'equipos',
        component: EquiposComponent,
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
