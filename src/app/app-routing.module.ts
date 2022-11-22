import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';

import { LoginComponent } from './auth/login/login.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '**',
    component: NotpagefoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
