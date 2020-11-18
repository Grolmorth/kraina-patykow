import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //navigation links [navlink[0]] - title, [navlink[1]] - routerlink

  navlinks = [
    ['Produkty', 'produkty'],
    ['Galeria', 'galeria'],
    ['Kontakt', 'kontakt'],
    ['O firmie', 'o-firmie'],
    ['Jak kupować', 'jak-kupowac'],
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
