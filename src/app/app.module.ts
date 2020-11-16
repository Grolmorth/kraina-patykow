import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavItemDisplayComponent } from './components/nav/nav-item-display/nav-item-display.component';

import { GalleryComponent } from './components/content/gallery/gallery.component';
import { ContactComponent } from './components/content/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProduktyDisplayComponent } from './components/content/produkty/produkty-display/produkty-display.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ProduktyCreateComponent } from './components/content/produkty/produkty-create/produkty-create.component';
import { ProduktyDisplayItemComponent } from './components/content/produkty/produkty-display-item/produkty-display-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DelayDirective } from './directives/delay.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { ProduktyEditComponent } from './components/content/produkty/produkty-edit/produkty-edit.component';
import { ProduktyDisplayItemContentComponent } from './components/content/produkty/produkty-display-item-content/produkty-display-item-content.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,

    SidebarComponent,
    NavItemDisplayComponent,

    GalleryComponent,
    ContactComponent,
    PageNotFoundComponent,
    ProduktyDisplayComponent,
    ProduktyCreateComponent,
    ProduktyDisplayItemComponent,
    DelayDirective,
    LoginComponent,
    ProduktyEditComponent,
    ProduktyDisplayItemContentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    AngularFireAuthModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
