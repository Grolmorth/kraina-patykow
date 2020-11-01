import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  navlinks = [
    ['Produkty', '/produkty'],
    ['Galeria', '/galeria'],
    ['Kontakt', '/kontakt']
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
