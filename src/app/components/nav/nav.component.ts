import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  //navigation links [navlink[0]] - title, [navlink[1]] - routerlink

  navlinks = [
    ['nazwa1', 'link1'],
    ['nazwa2', 'link2'],
    ['nazwa3', 'link3']
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
