import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produkty-display-item-content',
  templateUrl: './produkty-display-item-content.component.html',
  styleUrls: ['./produkty-display-item-content.component.scss'],
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
export class ProduktyDisplayItemContentComponent implements OnInit {
  product: any;

  constructor(private service: ProductServiceService, private route: ActivatedRoute, private location: Location) { }


  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key')
    this.service.getProduct(key);
    this.service.product.valueChanges().subscribe(obj => {
      this.product = obj;
    })

  }
  goBack() {
    this.location.back();
  }

}




