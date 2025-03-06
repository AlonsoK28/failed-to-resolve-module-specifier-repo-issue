import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegularExpressionService {

  // allows 0-9
  public readonly onlyNumbers = '[0-9]*';

  public readonly onlyDecimals = '[0-9.]*';

  // allows a-z, A-Z, á, é, í, ó, ú
  public readonly onlyLetters = '[a-zA-ZáéíóúÁÉÍÓÚ ]*';

  // allows a-z, A-Z, á, é, í, ó, ú, 0-9
  public readonly lettersAndNumbers = '^[a-zA-ZáéíóúÁÉÍÓÚ0-9 ]*$'

  // allows a-z, A-Z, á, é, í, ó, ú, 0-9, '-', '.'
  public readonly code = '[a-zA-ZáéíóúÁÉÍÓÚ0-9-. ]*';

  // allows a-z, 0-9, '-'
  public readonly slug = '[a-z0-9-]*';

  constructor() { }
}
