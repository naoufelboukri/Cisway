import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBorderCard]'
})
export class BorderCardDirective {
  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';

  constructor(private el: ElementRef) { 
    this.setBorder(this.initialColor);
    console.log('hello');

  }

  @Input('productBorderCard') borderColor: string;

  @HostListener('mouseenter') onMouserEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  setBorder(color: string) {
    this.el.nativeElement.style.backgroundColor = `${color}`;
    console.log('hello');
  }
}
