import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nav-item',
  templateUrl: './nav-item-display.component.html',
  styleUrls: ['./nav-item-display.component.scss']
})
export class NavItemDisplayComponent implements OnInit {
  @Input() link: any;

  constructor() { }

  ngOnInit(): void {
  }


}
