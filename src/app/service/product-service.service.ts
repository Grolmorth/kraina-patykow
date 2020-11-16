
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
    this.firebase.list('productDetails').push(productDetails);
  }
  getProduct(key) {
   return this.firebase.list('productDetails/' + key);
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







