import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenPipe',
})
export class ImagenPipePipe implements PipeTransform {
  transform(img: string | undefined): unknown {
    if (!img) {
      console.log(img);
      return '../../../assets/images/no-image.webp';
    }

    return img;
  }
}
