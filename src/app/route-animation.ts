import { trigger, transition, style, animate } from '@angular/animations';

export const routeAnimation = trigger('routeTrigger', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(400)
    ]),
    transition(':leave', [
        animate(400, style({
            opacity: 0
        }))
    ])
])