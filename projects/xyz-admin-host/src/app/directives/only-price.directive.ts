import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyPrice]'
})
export class OnlyPriceDirective {

  constructor(
    private el: ElementRef,
    private control: NgControl) { }

  // example https://stackoverflow.com/a/51937947/7724301
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    let e = <KeyboardEvent>event;
    /* 
        8 -  for backspace
        9 -  for tab
        13 - for enter
        27 - for escape
        46 - for delete
    */

    if ([8, 9, 13, 27, 46].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }

    // allow input '.' char one time
    if ((e.keyCode === 190 || e.keyCode === 110) && !this.el.nativeElement.value.includes('.')) {
      return;
    }

    // validate if value startswith "zero" 
    if (this.el.nativeElement.value.startsWith('0')) {
      e.preventDefault();
    }

    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  // on "focus out" set "1.0" to price field
  @HostListener('focusout') onFocusOut(){
    if (this.el.nativeElement.value.endsWith('.')){
      const currentValue = this.el.nativeElement.value += '0';
      this.control.control?.setValue(currentValue);
    }
    
    // empty value "case A"
    if(this.el.nativeElement.value === ''){
      const currentValue = this.el.nativeElement.value = '0';
      this.control.control?.setValue(currentValue);
    }

    // empty value "case B"
    if (this.el.nativeElement.value.startsWith('.')) {
      const currentValue = this.el.nativeElement.value = '0' + this.el.nativeElement.value;
      this.control.control?.setValue(currentValue);
    }
  }

  validateFields(event: any) {
    setTimeout(() => {
      let numberRegEx = /^[0-9]+$/;
      if (!numberRegEx.test(this.el.nativeElement.value)) {
        this.el.nativeElement.value = "";
        event.preventDefault();
      }
    }, 100)
  }

}
