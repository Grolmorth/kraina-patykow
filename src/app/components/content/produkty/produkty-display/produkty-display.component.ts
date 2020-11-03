import { ProductServiceService } from 'src/app/service/product-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-produkty-display',
  templateUrl: './produkty-display.component.html',
  styleUrls: ['./produkty-display.component.scss']
})
export class ProduktyDisplayComponent implements OnInit {

  productList: any[];


  constructor(private service: ProductServiceService) { }

  ngOnInit() {
    this.service.getProductDetailsList();
    this.service.productDetailList.snapshotChanges().subscribe(
      list => {
        this.productList = list.map(item => {

          return item.payload.val();
        });

      }
    );

  }
}
