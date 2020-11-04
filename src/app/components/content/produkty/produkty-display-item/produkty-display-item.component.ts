import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-produkty-display-item',
  templateUrl: './produkty-display-item.component.html',
  styleUrls: ['./produkty-display-item.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-300%) rotateY(180deg) rotateZ(90deg)' }),
        animate(1000)
      ])
    ])
  ]
})
export class ProduktyDisplayItemComponent {
  @Input() product: any;
  constructor() {}

}
