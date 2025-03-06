import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSlug]'
})
export class SlugDirective {

  constructor(private el: ElementRef) { }

  // example https://stackoverflow.com/a/51937947/7724301
  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    let e = <KeyboardEvent>event;
    const whiteSpaceKey = 32;
    const slashKey = 189;

    if (e.keyCode === whiteSpaceKey && this.el.nativeElement.value == '') {
      e.preventDefault();
      return;
    }

    if (e.keyCode === slashKey && this.el.nativeElement.value == '') {
      e.preventDefault();
      return;
    }

    if (e.keyCode === whiteSpaceKey && this.el.nativeElement.value.startsWith('-')) {
      e.preventDefault();
      return;
    }

    // validate if key is 'white space'
    if (e.keyCode === whiteSpaceKey) {
      e.preventDefault();
      this.el.nativeElement.value += '-';
    }
  }
}
