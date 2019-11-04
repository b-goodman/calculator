import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective {

  private timeout: number;

  constructor(private el: ElementRef<HTMLElement>) { }

  @Input('appActive') clicked: boolean;

  @HostListener ('document:keypress', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    if (this.el.nativeElement.classList.contains('btn') && this.el.nativeElement.dataset.value === e.key ) {
      this.isActive(true);
    } else {
      this.isActive(false);
      window.clearTimeout(this.timeout);
    }
  }

  private isActive(newState?: boolean) {
    this.el.nativeElement.dataset.active = JSON.stringify(newState);
    if (newState) {
      this.timeout = window.setTimeout( () => this.isActive(false), 80 ); // un-highlight btn after interval
    }
  }

}
