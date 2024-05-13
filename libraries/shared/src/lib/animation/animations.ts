import { animate, state, style, transition, trigger } from "@angular/animations";

export const slideFadeAnimation = trigger('slideFadeAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX({{ transition}})' }),
      animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ], { params: { transition: '-100%' } }), 
  ]);
  
  export const shakeAnimation = trigger('shakeAnimation', [
    state(
      'shake',
      style({
        transform: 'translateX(0)',
      })
    ),
    transition('void => shake', [
      animate('0.2s', style({ transform: 'translateX(-5px)' })),
      animate('0.2s', style({ transform: 'translateX(5px)' })),
      animate('0.2s', style({ transform: 'translateX(-5px)' })),
      animate('0.2s', style({ transform: 'translateX(0)' })),
    ]),
  ]);
  
  export const slideFadeAnimationLeave = trigger('slideFadeAnimationLeave', [
    transition(':leave', [
      style({ opacity: 0, transform: 'translateX({{ transition}})' }),
      animate('{{time}} ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
    ], { params: { transition: '0' , time: '0ms'} }), 
  ]);