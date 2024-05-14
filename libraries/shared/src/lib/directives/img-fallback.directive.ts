import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[libImgFallback]',
  standalone: true,
})

/**
 * This directive is used to set a fallback image in case the original image fails to load.
 */
export class ImgFallbackDirective implements OnInit {
  @Input() fallbackPath ='';
  @Input() failedPhotoIds: string[] = []
  @Input() id: string | undefined


  constructor(private elementRef: ElementRef<HTMLImageElement>) {}


  ngOnInit(): void {

    if(this.failedPhotoIds.includes(this.id as string)){
      this.elementRef.nativeElement.src = this.fallbackPath;
    }
    if (!this.fallbackPath) {
      this.elementRef.nativeElement.src = this.fallbackPath;
    }
  }
  @HostListener('error')
  loadFallbackImage() {  
    if (this.fallbackPath) {
      this.elementRef.nativeElement.src = this.fallbackPath; 
    }
  }
}
