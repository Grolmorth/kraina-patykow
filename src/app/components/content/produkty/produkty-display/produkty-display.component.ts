import { ProductServiceService } from 'src/app/service/product-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-produkty-display',
  templateUrl: './produkty-display.component.html',
  styleUrls: ['./produkty-display.component.scss']
})
export class ProduktyDisplayComponent implements OnInit {

  productList: any[];
  showList: any[];
  categoryList: string[] = ['Zabawki', 'Kuchnie', 'Inne'];

  categoryToys: boolean = true;
  categoryKitchen: boolean = true;
  categoryDif: boolean = true;
  constructor(private service: ProductServiceService, private router: Router) { }

  ngOnInit() {
    this.service.getProductDetailsList();
    this.service.productDetailList.snapshotChanges().subscribe(
      list => {
        this.productList = this.showList = list.map(item => {


          return ({ key: item.payload.key, ...item.payload.val() })
        });
      }
    );
  }
  selectCategoryToys() {
    this.categoryToys = !this.categoryToys;
    if (this.categoryToys === false) {
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i] === 'Zabawki') {
          this.categoryList.splice(i, 1);
        }
      }
    }
    else {
      this.categoryList.push('Zabawki');
    }
    this.updateShowList();
  }
  selectCategoryKitchen() {
    this.categoryKitchen = !this.categoryKitchen;
    if (this.categoryKitchen === false) {
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i] === 'Kuchnie') {
          this.categoryList.splice(i, 1)
        }
      }
    }
    else {
      this.categoryList.push('Kuchnie');
    }
    this.updateShowList();
  }
  selectCategoryDif() {
    this.categoryDif = !this.categoryDif;
    if (this.categoryDif === false) {
      for (let i = 0; i < this.categoryList.length; i++) {
        if (this.categoryList[i] === 'Inne') {
          this.categoryList.splice(i, 1);
        }
      }
    }
    else {
      this.categoryList.push('Inne');
    }
    this.updateShowList();
  }
  updateShowList() {
    this.showList = [];
    for (let i = 0, j = 0; i < this.productList.length; i++) {
      if (!this.categoryList.includes(this.productList[i].category)) {
        this.showList.push(this.productList[i]);
        j++;
      }
    }
  }
  deleteItem(product) {
    console.log(product)
    this.service.deleteProduct(product.key);
    this.service.deleteImage(product.imageRef);
    if (product.imageRef1) {
      this.service.deleteImage(product.imageRef1);
    }
    if (product.imageRef2) {
      this.service.deleteImage(product.imageRef2);
    }
  }
  editItem(product) {
    this.router.navigate(['/dodaj']);
    localStorage.setItem('productEdit', JSON.stringify(product));
  }
}



