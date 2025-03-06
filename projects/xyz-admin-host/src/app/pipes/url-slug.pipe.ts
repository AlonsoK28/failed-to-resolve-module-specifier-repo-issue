import { Pipe, PipeTransform } from '@angular/core';

// inertafes
import { KeywordType, SlugTypes } from '@interfaces/listsAPI';

// services
import { SlugService } from '@services/slug.service';

@Pipe({
  name: 'urlSlug'
})
export class UrlSlugPipe implements PipeTransform {
  
  constructor(
    private slugService: SlugService){

  }

  transform(keyword: string, keywordType: KeywordType, currentDomain: string): string {
    switch (keywordType) {
      case KeywordType.OnlyList:
        return currentDomain + '/' + this.slugService.slug(this.slugService.slugify(keyword), SlugTypes.List);
        
      case KeywordType.OnlyService:
        return currentDomain + '/' + this.slugService.slug(this.slugService.slugify(keyword), SlugTypes.Service);

    }
  }

}
