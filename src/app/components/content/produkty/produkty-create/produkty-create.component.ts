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

  formTemplate = new FormGroup({

    name: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
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
      this.imgSrc = this.editProduct.imageUrl;
      if (this.editProduct.imageUrl1) { this.imgSrc1 = this.editProduct.imageUrl1; }
      if (this.editProduct.imageUrl2) { this.imgSrc2 = this.editProduct.imageUrl2; }
    }
    else { this.resetForm(); }
  }
  constructor(private productService: ProductServiceService, private storage: AngularFireStorage) {

  }
  // uploading form with max to 3 pictures
  async onSubmit(formValue) {

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
    console.log('resret')
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '', info: '', category: '', imageUrl: '', imageUrl1: '', imageUrl2: '', price: ''
    });
    this.imgSrc = "/assets/default-image.jpg";
    this.imgSrc1 = "/assets/default-image.jpg";
    this.imgSrc2 = "/assets/default-image.jpg";
    this.selectedImage = null;
    this.selectedImage1 = null;
    this.selectedImage2 = null;
    this.editProduct = null;
    this.imgChange = false;
    this.imgChange1 = false;
    this.imgChange2 = false;

    localStorage.removeItem('productEdit');
  }
  changeImg(ref, num) {
    if (ref) {
      this.productService.deleteImage(ref);
    }
    if (num === 0) {
      this.imgChange = true;

    } else if (num === 1) {
      this.imgChange1 = true;

    } else if (num === 2) {
      this.imgChange2 = true;

    }
  }
  async submitEditProduct(formValue) {
    if (this.imgChange) {
      const filePath = `${formValue.category}/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      await this.storage.upload(filePath, this.selectedImage).then(() => {
        fileRef.getDownloadURL().subscribe(url => {
          formValue['imageUrl'] = url;
          formValue['imageRef'] = filePath;
          if (this.selectedImage1 === null && !this.imgChange1 && !this.imgChange2 && !this.editProduct.imageRef1) {
            this.productService.deleteProduct(this.editProduct.key);
            console.log(formValue, this.editProduct)
            return this.sendAndReset(formValue);
          }
        });
      });
    } else {
      formValue['imageUrl'] = this.editProduct.imageUrl;
      formValue['imageRef'] = this.editProduct.imageRef;
      if (this.selectedImage1 === null && !this.imgChange1 && !this.imgChange2 && !this.editProduct.imageRef1) {
        this.productService.deleteProduct(this.editProduct.key);
        console.log(formValue, this.editProduct)
        return this.sendAndReset(formValue);
      }
    }
    if (this.imgChange1) {
      const filePath = `${formValue.category}/${this.selectedImage1.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      await this.storage.upload(filePath, this.selectedImage1).then(() => {
        fileRef.getDownloadURL().subscribe(url => {
          formValue['imageUrl1'] = url;
          formValue['imageRef1'] = filePath;
          console.log(this.editProduct.imageRef2)
          if (this.selectedImage2 === null && !this.imgChange2 && this.editProduct.imageRef2 !== null) {
            this.productService.deleteProduct(this.editProduct.key);
            console.log(formValue, this.editProduct)
            return this.sendAndReset(formValue);
          }
        });
      });
    } else if (this.editProduct.imageRef1) {
      formValue['imageUrl1'] = this.editProduct.imageUrl1;
      formValue['imageRef1'] = this.editProduct.imageRef1;
      if (!this.imgChange2 && !this.editProduct.imageRef2) {
        this.productService.deleteProduct(this.editProduct.key);
        console.log(formValue, this.editProduct)
        return this.sendAndReset(formValue);
      }
    }
    if (this.imgChange2) {
      const filePath = `${formValue.category}/${this.selectedImage2.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      await this.storage.upload(filePath, this.selectedImage2).then(() => {
        fileRef.getDownloadURL().subscribe(url => {
          formValue['imageUrl2'] = url;
          formValue['imageRef2'] = filePath;
          this.productService.deleteProduct(this.editProduct.key);
          console.log(formValue, this.editProduct)
          return this.sendAndReset(formValue);
        });
      });
    } else if (this.editProduct.imageRef2) {
      formValue['imageUrl2'] = this.editProduct.imageUrl2;
      formValue['imageRef2'] = this.editProduct.imageRef2;
      this.productService.deleteProduct(this.editProduct.key);
      console.log(formValue, this.editProduct)
      return this.sendAndReset(formValue);
    }
  }
  sendAndReset(formValue) {
    this.productService.insertProductDetails(formValue);
    this.resetForm();
  }

}
