import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
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
export class FooterComponent implements OnInit {

  navlinks = [
    ['Produkty', '/produkty'],
    ['Galeria', '/galeria'],
    ['Kontakt', '/kontakt'],
    ['O firmie', '/o-firmie'],
    ['Jak kupować', 'jak-kupowac'],
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
