import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [
  // 'dashboard'->pagesModule
  // 'equipos'->pagesModule
  // 'login'-->AuthModule
  // 'register'-->AuthModule

  {
    path: '**',
    component: NotpagefoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
