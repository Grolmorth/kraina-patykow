import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //navigation links [navlink[0]] - title, [navlink[1]] - routerlink, submenu [navlink[2]]

  navlinks = [
    ['Produkty', 'produkty'],
    ['Galeria', 'galeria'],
    ['Kontakt', 'kontakt',[['Galeria', 'galeria'], ['Kontakt', 'kontakt']]],
    ['O firmie', 'o-firmie', [['Galeria', 'galeria'], ['Jak kupować', 'jak-kupowac']]],

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
