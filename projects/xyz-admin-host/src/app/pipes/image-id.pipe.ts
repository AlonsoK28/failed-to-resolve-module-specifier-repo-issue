import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageId',
  standalone: false
})
export class ImageIdPipe implements PipeTransform {

  transform(value: string | undefined): string {
    return value?.split('/productos/')[1]!;
  }

}
