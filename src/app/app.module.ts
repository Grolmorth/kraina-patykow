import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavItemDisplayComponent } from './components/nav/nav-item-display/nav-item-display.component';
import { ProduktyComponent } from './components/content/produkty/produkty.component';
import { GalleryComponent } from './components/content/gallery/gallery.component';
import { ContactComponent } from './components/content/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProduktyDisplayComponent } from './components/content/produkty/produkty-display/produkty-display.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,

    SidebarComponent,
    NavItemDisplayComponent,
    ProduktyComponent,
    GalleryComponent,
    ContactComponent,
    PageNotFoundComponent,
    ProduktyDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
