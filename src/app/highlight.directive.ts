import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef<HTMLElement>) { }

  @Input('appHighlight') hover: boolean;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(false);
  }

  private highlight(newState?: boolean) {
    this.el.nativeElement.dataset.hover = JSON.stringify(newState);
  }

}
