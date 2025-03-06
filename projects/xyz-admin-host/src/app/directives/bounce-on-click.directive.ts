import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBounceOnClick]'
})
export class BounceOnClickDirective {

  animateClass: string = 'animated';
  bounceInClass: string = 'bounceIn';
  toRemoveClass: string = 'fadeIn';

  @HostListener('click') click() {
    this.renderer.addClass(this.el.nativeElement, this.animateClass);
    this.renderer.addClass(this.el.nativeElement, this.bounceInClass);
    this.renderer.removeClass(this.el.nativeElement, this.toRemoveClass);
    this.renderer.listen(this.el.nativeElement, 'animationend', () => {
      this.renderer.removeClass(this.el.nativeElement, this.bounceInClass);
    })
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2 ) {
  }

}
