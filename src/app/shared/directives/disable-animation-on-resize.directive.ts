import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDisableAnimationOnResize]'
})
export class DisableAnimationOnResizeDirective {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('window:resize')
  onResize(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'disable-animation');
    setTimeout(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'disable-animation');
    }, 400);
  }
}