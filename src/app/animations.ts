/**
 * Created by Xposean on 2017-10-9.
 */
import { AnimationEntryMetadata, state } from '@angular/core';
import { trigger, transition, animate, style, query, group } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'opacity:1' }),
        animate('0.5s ease-in-out', style({ opacity:0}))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'opacity:1' }),
        animate('0.5s ease-in-out', style({ opacity:1}))
      ], { optional: true }),
    ])
  ])
])
