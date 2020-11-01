import { ContactComponent } from './components/content/contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './components/content/gallery/gallery.component';
import { ProduktyComponent } from './components/content/produkty/produkty.component';

const routes: Routes = [
  {
    path: '',
    component: ProduktyComponent
  },
  {
    path: 'produkty',
    component: ProduktyComponent
  },
  {
    path: 'galeria',
    component: GalleryComponent
  },
  {
    path: 'kontakt',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
