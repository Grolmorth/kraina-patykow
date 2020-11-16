
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';



import { ProductServiceService } from 'src/app/service/product-service.service';

export class Product {
  id: number;
  name: string;
  info: string;
  category: string;
  imagePath0: string;
  imagePath1: string;
  imagePath2: string;
  imageUrl0: string;
  imageUrl1: string;
  imageUrl2: string;
  key: string;
  price?: string;

}

@Component({
  selector: 'app-produkty-create',
  templateUrl: './produkty-create.component.html',
  styleUrls: ['./produkty-create.component.scss']
})
export class ProduktyCreateComponent implements OnInit {

  imgSrc: Array<string> = ['assets/default-image.jpg', '/assets/default-image.jpg', '/assets/default-image.jpg'];
  selectedImage: Array<any> = [];
  filePath: Array<string> = [];
  fileRef: Array<any> = [];

  imgChange = [false, false, false];
  editProduct: Product = null;
  categoryList: string[] = ['Zabawki', 'Kuchnie', 'Inne'];
  uploads: number = 0;


  formTemplate = new FormGroup({
    name: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl0: new FormControl(''),
    imageUrl1: new FormControl(''),
    imageUrl2: new FormControl(''),
    price: new FormControl(''),

  });

  ngOnInit() {

    this.editProduct = JSON.parse(localStorage.getItem('productEdit'));
    if (this.editProduct) {
      this.formTemplate.patchValue({
        name: this.editProduct.name,
        info: this.editProduct.info,
        category: this.editProduct.category,
      });
      this.imgSrc[0] = this.editProduct.imageUrl0;
      if (this.editProduct.imageUrl1) { this.imgSrc[1] = this.editProduct.imageUrl1; }
      if (this.editProduct.imageUrl2) { this.imgSrc[2] = this.editProduct.imageUrl2; }

    }
    else { this.resetForm(); }
  }
  constructor(private productService: ProductServiceService, private storage: AngularFireStorage) {
  }
  // uploading form with max to 3 pictures
  async onSubmit(formValue) {
    this.countUploads();
    if (this.formTemplate.valid) {
      for (let n = 0; n < this.uploads; n++) {
        await this.uploadImgGetUrl(formValue, n).then(() => {
          if (n === this.uploads - 1) {
            if (this.uploads === 1) { this.waitForUpload(formValue.imageUrl0, formValue) };
            if (this.uploads === 2) { this.waitForUpload(formValue.imageUrl0 && formValue.imageUrl1, formValue) };
            if (this.uploads === 3) { this.waitForUpload(formValue.imageUrl0 && formValue.imageUrl1 && formValue.imageUrl2, formValue) };
          }
        });
      }
    }

  }
  //edit product form
  async submitEditProduct(formValue) {
    this.countEditUploads();
    console.log(this.uploads)
    for (let n = 0; n < this.uploads; n++) {
      if (this.imgChange[n]) {
        await this.uploadImgGetUrl(formValue, n);
        //assign editProduct Values to form if img has not beed changed
      } else if (!this.imgChange[n] && this.editProduct) {
        if (n === 0 && this.editProduct.imageUrl0) {
          formValue.imageUrl0 = this.editProduct.imageUrl0;
          formValue.imagePath0 = this.editProduct.imagePath0;
        }
        else if (n === 1 && this.editProduct.imageUrl1) {
          formValue.imageUrl1 = this.editProduct.imageUrl1;
          formValue.imagePath1 = this.editProduct.imagePath1;
        }
        else if (n === 2 && this.editProduct.imageUrl2) {
          formValue.imageUrl2 = this.editProduct.imageUrl2;
          formValue.imagePath2 = this.editProduct.imagePath2;
        }
      }
      if (n === this.uploads - 1) {
        if (this.uploads === 1) {
          this.waitForUpload(formValue.imageUrl0, formValue);
          this.productService.deleteProduct(this.editProduct.key);
        }
        if (this.uploads === 2) {
          this.waitForUpload(formValue.imageUrl0 && formValue.imageUrl1, formValue);
          this.productService.deleteProduct(this.editProduct.key);
        }
        if (this.uploads === 3) {
          this.waitForUpload(formValue.imageUrl0 && formValue.imageUrl1 && formValue.imageUrl2, formValue)
          this.productService.deleteProduct(this.editProduct.key);
        }
      }
    }
  }
  //mark edited product images
  changeImg(ref, num) {
    if (ref) {
      this.productService.deleteImage(ref);
    }
    this.imgChange[num] = true;
  }
  //add record to db and reset
  sendAndReset(formValue) {
    this.productService.insertProductDetails(formValue);
    this.resetForm();
  }
  //upload images to storage and save their url to form
  async uploadImgGetUrl(formValue, num) {
    this.filePath[num] = `${formValue.category}/${this.selectedImage[num].name}_${new Date().getTime()}`;
    this.fileRef[num] = this.storage.ref(this.filePath[num]);
    await this.storage.upload(this.filePath[num], this.selectedImage[num]).then(() => {
      this.fileRef[num].getDownloadURL().subscribe(url => {
        if (num === 0) {
          formValue.imageUrl0 = url;
          formValue.imagePath0 = this.filePath[num];
        }
        if (num === 1) {
          formValue.imageUrl1 = url;
          formValue.imagePath1 = this.filePath[num];
        }
        if (num === 2) {
          formValue.imageUrl2 = url;
          formValue.imagePath2 = this.filePath[num];
        }
      })
    })

  }
  // when condition is fulfilled, proceed to send form
  async waitForUpload(condition, formValue) {
    return await new Promise(resolve => {
      const interval = setInterval(() => {
        if (condition) {
          resolve(this.sendAndReset(formValue));
          clearInterval(interval);
        };
      }, 1000);
    });
  }
  //reset to default
  resetForm() {
    console.log('resret');
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '', info: '', category: '', imageUrl0: '', imageUrl1: '', imageUrl2: '', price: ''
    });
    this.imgSrc[0] = this.imgSrc[1] = this.imgSrc[2] = '/assets/default-image.jpg';
    this.selectedImage = [];
    this.imgChange = [false, false, false];
    this.editProduct = null;
    this.uploads = 0;
    localStorage.removeItem('productEdit');
  }
  // count uploads for submit
  countUploads() {
    for (let n = 0; n < 3; n++) {
      if (this.selectedImage[n]) {
        this.uploads = n + 1;
      }
    }
  }
  countEditUploads() {
    for (let n = 0; n < 3; n++) {
      if (this.selectedImage[n]) {
        this.uploads = n + 1;
      }
    }
    if (this.editProduct.imagePath0 && this.uploads < 1) {
      this.uploads = 1;
    }
    if (this.editProduct.imagePath1 && this.uploads < 2) {
      this.uploads = 2;
    }
    if (this.editProduct.imagePath2 && this.uploads < 3) {
      this.uploads = 3;
    }
  }
  //show images after picking them
  showPreview(event: any, num: number) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc[num] = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage[num] = event.target.files[0];
    }
    else {
      this.selectedImage[num] = null;
    }
  }
}


