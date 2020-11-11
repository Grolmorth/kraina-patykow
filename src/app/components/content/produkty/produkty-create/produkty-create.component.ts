import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from 'src/app/service/product-service.service';

export class Product {
  name: string;
  info: string;
  category: string;
  imageRef: string;
  imageRef1?: string;
  imageRef2?: string;
  imageUrl: string;
  imageUrl1?: string;
  imageUrl2?: string;
  key: string;
  price?: string;

}


@Component({
  selector: 'app-produkty-create',
  templateUrl: './produkty-create.component.html',
  styleUrls: ['./produkty-create.component.scss']
})
export class ProduktyCreateComponent implements OnInit {

  imgSrc: string = "/assets/default-image.jpg";
  imgSrc1: string = "/assets/default-image.jpg";
  imgSrc2: string = "/assets/default-image.jpg";
  selectedImage: any = null;
  selectedImage1: any = null;
  selectedImage2: any = null;
  imgChange = false;
  imgChange1 = false;
  imgChange2 = false;
  editProduct: Product = null;


  categoryList: string[] = ['Zabawki', 'Kuchnie', 'Inne'];
  isSubmitted = false;

  formTemplate = new FormGroup({

    name: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    imageUrl1: new FormControl(''),
    imageUrl2: new FormControl(''),
    price: new FormControl(''),

  });

  ngOnInit() {
    this.resetForm();
    this.editProduct = JSON.parse(localStorage.getItem('productEdit'));
    if (this.editProduct) {
      this.formTemplate.patchValue({
        name: this.editProduct.name,
        info: this.editProduct.info,
        category: this.editProduct.category,
      });
      this.imgSrc = this.editProduct.imageUrl;
      if (this.editProduct.imageUrl1) { this.imgSrc1 = this.editProduct.imageUrl1; }
      if (this.editProduct.imageUrl2) { this.imgSrc2 = this.editProduct.imageUrl2; }
    }
  }
  constructor(private productService: ProductServiceService, private storage: AngularFireStorage) {

  }
  // uploading form with max to 3 pictures
  async onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      const filePath = `${formValue.category}/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      await this.storage.upload(filePath, this.selectedImage).then(() => {
        fileRef.getDownloadURL().subscribe(url => {
          formValue['imageUrl'] = url;
          formValue['imageRef'] = filePath;
          if (this.selectedImage1 === null) {
            this.sendAndReset(formValue);
          }
        });

      });
      if (this.selectedImage1 !== null) {
        const filePath = `${formValue.category}/${this.selectedImage1.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        await this.storage.upload(filePath, this.selectedImage1).then(() => {
          fileRef.getDownloadURL().subscribe(url => {
            formValue['imageUrl1'] = url;
            formValue['imageRef1'] = filePath;
            if (this.selectedImage2 === null) {
              this.sendAndReset(formValue);
            }
          });
        });
      }
      if (this.selectedImage2 !== null) {
        const filePath = `${formValue.category}/${this.selectedImage2.name}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        await this.storage.upload(filePath, this.selectedImage2).then(() => {
          fileRef.getDownloadURL().subscribe(url => {
            formValue['imageUrl2'] = url;
            formValue['imageRef2'] = filePath;
            this.sendAndReset(formValue);
          });
        });
      }

    }

  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.selectedImage = null;
    }
  }
  showPreview1(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc1 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage1 = event.target.files[0];
    }
    else {
      this.selectedImage1 = null;
    }
  }
  showPreview2(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc2 = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage2 = event.target.files[0];
    }
    else {
      this.selectedImage2 = null;
    }
  }

  resetForm() {
    console.log('asd')
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '', info: '', category: '', imageUrl: '', imageUrl1: '', imageUrl2: '', price: ''
    });
    this.imgSrc = "/assets/default-image.jpg";
    this.imgSrc1 = "/assets/default-image.jpg";
    this.imgSrc2 = "/assets/default-image.jpg";
    this.isSubmitted = false;
    this.selectedImage = null;
    this.selectedImage1 = null;
    this.selectedImage2 = null;

    localStorage.removeItem('productEdit');
  }
  changeImg(change) {
    if (change === 0) {
      this.imgChange = true;
    }

  }
  submitEditProduct(value) {

    if (!this.imgChange) {
      value['imageUrl'] = this.editProduct.imageUrl;
      value['imageRef'] = this.editProduct.imageRef;
      this.productService.insertProductDetails(value);
      this.productService.deleteProduct(this.editProduct.key);
    }

    this.resetForm();

  }
  sendAndReset(formValue) {
    this.productService.insertProductDetails(formValue);
    this.resetForm();
  }

}
