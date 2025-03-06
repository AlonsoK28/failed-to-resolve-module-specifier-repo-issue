import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultImageSrc'
})
export class DefaultImageSrcPipe implements PipeTransform {

  defaultImageSrc: string = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png';


  transform(id: number): string {
    return this.defaultImageSrc + id + '-1.jpg';
  }

}
