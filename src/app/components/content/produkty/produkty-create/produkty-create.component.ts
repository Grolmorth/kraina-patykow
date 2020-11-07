import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { finalize, map } from 'rxjs/operators';


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


  categoryList: string[] = ['Zabawki', 'Kuchnie', 'Inne'];
  isSubmitted = false;

  formTemplate = new FormGroup({

    name: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    imageUrl1: new FormControl('',),
    imageUrl2: new FormControl('',),
    price: new FormControl(''),

  });

  ngOnInit() {
    this.resetForm();
  }
  constructor(private productService: ProductServiceService, private storage: AngularFireStorage) {

  }
// uploading form with max to 3 pictures
  async onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      let filePath = `${formValue.category}/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      await this.storage.upload(filePath, this.selectedImage).then(() => {
        fileRef.getDownloadURL().subscribe(url => {
          formValue['imageUrl'] = url;
          if (this.selectedImage1 === null) {
            this.productService.insertProductDetails(formValue);
            this.resetForm();
          }
        });
      }).then(() => {
        if (this.selectedImage1 !== null) {
          let filePath1 = `${formValue.category}/${this.selectedImage1.name}_${new Date().getTime()}`;
          const fileRef1 = this.storage.ref(filePath1);
          this.storage.upload(filePath1, this.selectedImage1).then(() => {
            fileRef1.getDownloadURL().subscribe(url => {
              formValue['imageUrl1'] = url;
              if (this.selectedImage2 === null) {
                this.productService.insertProductDetails(formValue);
                this.resetForm();
              }
            });
          });
        }
      }).then(() => {
        if (this.selectedImage1 !== null) {
          let filePath2 = `${formValue.category}/${this.selectedImage2.name}_${new Date().getTime()}`;
          const fileRef2 = this.storage.ref(filePath2);
          this.storage.upload(filePath2, this.selectedImage2).then(() => {
            fileRef2.getDownloadURL().subscribe(url => {
              formValue['imageUrl2'] = url;
              this.productService.insertProductDetails(formValue);
              this.resetForm();
            });
          });
        }
      });
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
  }


}
