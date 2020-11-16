
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from 'src/app/service/product-service.service';






@Component({
  selector: 'app-produkty-display-item-content',
  templateUrl: './produkty-display-item-content.component.html',
  styleUrls: ['./produkty-display-item-content.component.scss']
})
export class ProduktyDisplayItemContentComponent implements OnInit {
  product: any;
  constructor(private service: ProductServiceService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const key = this.route.snapshot.paramMap.get('key')
    this.service.getProduct(key).snapshotChanges().subscribe(c => {
      c.map(val => {
        console.log(val)

      }
      )
    })

  }


}



