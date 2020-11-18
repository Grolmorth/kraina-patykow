import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
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
