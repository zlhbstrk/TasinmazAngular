import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Layout/nav/nav.component';
import { HeaderComponent } from './Layout/header/header.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { IlEkleComponent } from './Il/il-ekle/il-ekle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { IlListeleComponent } from './Il/il-listele/il-listele.component';
import { MahalleEkleComponent } from './Mahalle/mahalle-ekle/mahalle-ekle.component';
import { IlceEkleComponent } from './Ilce/ilce-ekle/ilce-ekle.component';
import { KullaniciEkleComponent } from './Kullanici/kullanici-ekle/kullanici-ekle.component';
import { TasinmazEkleComponent } from './Tasinmaz/tasinmaz-ekle/tasinmaz-ekle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    IlEkleComponent,
    IlListeleComponent,
    MahalleEkleComponent,
    IlceEkleComponent,
    KullaniciEkleComponent,
    TasinmazEkleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
