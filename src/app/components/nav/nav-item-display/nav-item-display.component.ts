import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'nav-item',
  templateUrl: './nav-item-display.component.html',
  styleUrls: ['./nav-item-display.component.scss'],
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
export class NavItemDisplayComponent implements OnInit {
  @Input() link: any;

  constructor() { }

  ngOnInit(): void {
  }


}
