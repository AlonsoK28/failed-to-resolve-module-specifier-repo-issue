import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chipListElipsis'
})
export class ChipListPipe implements PipeTransform {

  transform(value: string): string {
    if(value){
      return value.length > 40 ? value.substring(0, 39) + '...' : value
    }else{
      return '-- no data --';
    } 
  }
}
