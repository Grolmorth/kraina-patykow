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
    console.log(productDetails)

    this.firebase.list('productDetails').push(productDetails);

  }

  getProductDetailsList() {
    this.productDetailList = this.firebase.list('productDetails');
  }
  deleteImage(imageRef) {
    this.storage.ref(imageRef).delete();
  }
  deleteProduct(key) {
    this.firebase.list('productDetails/' + key).remove();
  }






}







