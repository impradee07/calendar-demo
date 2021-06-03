import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appClick]',
})
export class ClickDirective {
  constructor(private el: ElementRef) {}
  @HostBinding('class.close') isOpen = false;
  @HostListener('click') toggleOpen($event) {
    this.isOpen = !this.isOpen;
  }
}
