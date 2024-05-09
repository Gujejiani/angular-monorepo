import { animate, style, transition, trigger } from "@angular/animations";

export const slideFadeAnimation = trigger('slideFadeAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX({{ transition}})' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ], { params: { transition: '-100%' } }), 
  ]);