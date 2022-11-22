import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { EquiposComponent } from './equipos/equipos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPagesComponent } from './main-pages.component';

@NgModule({
  declarations: [MainPagesComponent, EquiposComponent, DashboardComponent],
  imports: [CommonModule, SharedModule, PagesRoutingModule],
  exports: [],
})
export class PagesModule {}
