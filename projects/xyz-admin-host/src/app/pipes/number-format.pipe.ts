import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number): string {
    if(value){
      return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 3 }).format(value);
    }else{
      return '0';
    }
  }

}
