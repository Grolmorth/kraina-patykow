import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from 'src/app/service/product-service.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-produkty-create',
  templateUrl: './produkty-create.component.html',
  styleUrls: ['./produkty-create.component.scss']
})
export class ProduktyCreateComponent implements OnInit {
  imgSrc: string = "/assets/default-image.jpg";
  selectedImage: any = null;

  categoryList: string[] = ['Zabawki', 'Kuchnie', 'Inne'];
  isSubmitted = false;

  formTemplate = new FormGroup({

    name: new FormControl('', Validators.required),
    info: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required),
    price: new FormControl(''),

  });
  ngOnInit() {
    this.resetForm();
  }
  constructor(private productService: ProductServiceService, private storage: AngularFireStorage) {

  }

  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      var filePath = `${formValue.category}/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.productService.insertProductDetails(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
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

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      name: '', info: '', category: '', imageUrl: '', price: ''
    });
    this.imgSrc = "/assets/default-image.jpg";
    this.isSubmitted = false;
    this.selectedImage = null;
  }


}
