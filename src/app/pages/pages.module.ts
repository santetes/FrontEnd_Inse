import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MainPagesComponent } from './main-pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoEquiposComponent } from './equipos/listado-equipos/listado-equipos.component';
import { DashboardSettingsComponent } from './configuracion/dashboard-settings/dashboard-settings.component';

@NgModule({
  declarations: [
    MainPagesComponent,
    DashboardComponent,
    ListadoEquiposComponent,
    DashboardSettingsComponent,
  ],
  imports: [CommonModule, SharedModule, PagesRoutingModule],
  exports: [MainPagesComponent],
})
export class PagesModule {}
