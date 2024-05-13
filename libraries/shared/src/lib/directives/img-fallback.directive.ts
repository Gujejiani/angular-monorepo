import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[libImgFallback]',
  standalone: true,
})
export class ImgFallbackDirective {
  @Input() fallbackPath ='';
  
  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  loadFallbackImage() {
    if (this.fallbackPath) {
      this.elementRef.nativeElement.src = this.fallbackPath;
    }
  }
}
