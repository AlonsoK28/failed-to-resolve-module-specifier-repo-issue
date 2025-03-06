import { Injectable } from '@angular/core';
import { SlugTypes } from '@interfaces/listsAPI';

@Injectable({
  providedIn: 'root'
})
export class SlugService {

  constructor() { }
  
  // docs convert "Playstation 3 128GB" to "playstation-3-128gb"
  // reference https://gist.github.com/codeguy/6684588?permalink_comment_id=3243980#gistcomment-3243980
  slugify(text:string) {
  return text
    .toString() // Cast to string (optional)
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
  }

  // docs convert "Playstation 3 128GB" to "playstation 3 128gb"
  keyword(text:string){
    const res = this.slugify(text);
    return res.replace(/-/g, ' ');
  }

  slug(slug: string, type: SlugTypes){
    switch (type) {
      case SlugTypes.Product:
        return `${this.slugify(slug)}/p`;

      case SlugTypes.List:
        return `${this.slugify(slug)}/l`;
    
      case SlugTypes.Service:
        return `${this.slugify(slug)}/s`;

      case SlugTypes.Brand:
        return `marca/${this.slugify(slug)}/pagina1.html`;

      case SlugTypes.Subcategory:
        return `subcategoria/${this.slugify(slug)}/pagina1.html`;

      case SlugTypes.Category: 
        return `categoria/${this.slugify(slug)}/pagina1.html`;

      default:
        return `${this.slugify(slug)}/l`;
    }
  }
}
