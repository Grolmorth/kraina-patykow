import { LoginComponent } from './components/login/login.component';
import { ProduktyDisplayComponent } from './components/content/produkty/produkty-display/produkty-display.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactComponent } from './components/content/contact/contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './components/content/gallery/gallery.component';
import { ProduktyCreateComponent } from './components/content/produkty/produkty-create/produkty-create.component';
import { AuthGuard } from './service/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: ProduktyDisplayComponent,
    pathMatch: 'full'
  },
  {
    path: 'dodaj',
    component: ProduktyCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: LoginComponent
  },
  {
    path: 'produkty',
    component: ProduktyDisplayComponent
  },
  {
    path: 'galeria',
    component: GalleryComponent
  },
  {
    path: 'kontakt',
    component: ContactComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
