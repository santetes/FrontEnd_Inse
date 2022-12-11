import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePipe } from './role.pipe';
import { ImagenPipePipe } from './imagen-pipe.pipe';

@NgModule({
  declarations: [RolePipe, ImagenPipePipe],
  imports: [CommonModule],
  exports: [RolePipe, ImagenPipePipe],
})
export class PipesModule {}
