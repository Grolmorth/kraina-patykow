import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  productDetailList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  insertProductDetails(productDetails) {
    this.productDetailList.push(productDetails);
  }

  getProductDetailsList() {
    this.productDetailList = this.firebase.list('productDetails');
  }






}
