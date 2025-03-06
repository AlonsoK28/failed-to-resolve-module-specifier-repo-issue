import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value && value == 0.0) {
      return 'N/A';
    } else if(value){
      const options = { style: 'currency', currency: 'USD' };
      
      // example https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format
      const numberFormat = new Intl.NumberFormat('en-US', options);

      return numberFormat.format(value).toString();
    }
    else{
      return '';
    }
  }

}
