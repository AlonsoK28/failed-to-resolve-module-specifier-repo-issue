import { Pipe, PipeTransform } from '@angular/core';

// interfaces
import { KeywordType, KeywordTypeName } from '@interfaces/listsAPI';

@Pipe({
  name: 'keywordType'
})
export class KeywordTypePipe implements PipeTransform {

  transform(value: number): KeywordTypeName {
    if(value){
      switch (value) {
        case KeywordType.OnlyList:
          return KeywordTypeName.OnlyList;

        case KeywordType.OnlyService:
          return KeywordTypeName.OnlyService;

        default: 
        return KeywordTypeName.OnlyList;
      }
    }else{
      return KeywordTypeName.OnlyList;
    }
  }

}
