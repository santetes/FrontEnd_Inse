import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { MainPagesComponent } from './main-pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListadoEquiposComponent } from './equipos/listado-equipos/listado-equipos.component';
import { DashboardSettingsComponent } from './configuracion/dashboard-settings/dashboard-settings.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import { UsuarioModalComponent } from './modals/usuario-modal/usuario-modal.component';

@NgModule({
  declarations: [
    MainPagesComponent,
    DashboardComponent,
    ListadoEquiposComponent,
    DashboardSettingsComponent,
    UsuariosComponent,
    UsuarioModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  exports: [MainPagesComponent, UsuarioModalComponent],
})
export class PagesModule {}
