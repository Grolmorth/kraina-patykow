import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  productDetailList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private storage: AngularFireStorage) { }

  insertProductDetails(productDetails) {
    if (this.productDetailList === undefined) {
      this.productDetailList = this.firebase.list('productDetails');
    }
    this.productDetailList.push(productDetails);
  }

  getProductDetailsList() {
    this.productDetailList = this.firebase.list('productDetails');

  }

  deleteProduct(product) {
    console.log(product.imageUrl)

    console.log(product)

    this.storage.ref(`${product.imageRef}`).delete();

    this.firebase.list('productDetails/' + product.key).remove();
  }






}







