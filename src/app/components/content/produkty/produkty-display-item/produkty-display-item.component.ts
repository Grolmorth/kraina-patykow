import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-produkty-display-item',
  templateUrl: './produkty-display-item.component.html',
  styleUrls: ['./produkty-display-item.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0, transform: 'rotateY(90deg)' }),
        animate(500)
      ])
    ])
  ]
})
export class ProduktyDisplayItemComponent {
  @Input() product: any;
  constructor() {}

}
