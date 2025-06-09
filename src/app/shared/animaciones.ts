import { trigger, transition, style, animate, state } from '@angular/animations';

export const fadeSlideIn = trigger('fadeSlideIn', [
  state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
  transition(':enter', [
    animate('600ms ease-out')
  ])
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);