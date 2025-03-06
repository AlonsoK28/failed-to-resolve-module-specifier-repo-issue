import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor(private _el: ElementRef) { }
  /**
  * @author Victor Peña
  * vipea@empresaexterna.com.mx
  * Listening to the input event and then it is replacing the value of the input with the value of the
  * input with the value of the input
  */
  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    let initVal = this._el.nativeElement.value;
    this._el.nativeElement.value = initVal.replace(/[^0-9.]\s*/g, '');
    if (initVal !== this._el.nativeElement.value) { event.stopPropagation(); }
  }
  /**
  * @author Victor Peña
  * vipea@empresaexterna.com.mx
  * A function that is listening to the keypress event.
  */
  @HostListener('keypress', ['$event']) onKeypress(event: KeyboardEvent) {
    const reg = new RegExp(/[^0-9.]\s*/g);
    let input = event.key;
    if (reg && reg.test(input)) { event.preventDefault(); }
  }
}
