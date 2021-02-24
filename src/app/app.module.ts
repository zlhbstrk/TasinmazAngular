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
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { KullaniciListeleComponent } from './Kullanici/kullanici-listele/kullanici-listele.component';
import { IlceListeleComponent } from './Ilce/ilce-listele/ilce-listele.component';
import { MahalleListeleComponent } from './Mahalle/mahalle-listele/mahalle-listele.component';
import { TasinmazListeleComponent } from './Tasinmaz/tasinmaz-listele/tasinmaz-listele.component';
import { LogListeleComponent } from './Log/log-listele/log-listele.component';
import { IlDuzenleComponent } from './Il/il-duzenle/il-duzenle.component';
import { IlceDuzenleComponent } from './Ilce/ilce-duzenle/ilce-duzenle.component';
import { KullaniciDuzenleComponent } from './Kullanici/kullanici-duzenle/kullanici-duzenle.component';
import { MahalleDuzenleComponent } from './Mahalle/mahalle-duzenle/mahalle-duzenle.component';
import { TasinmazDuzenleComponent } from './Tasinmaz/tasinmaz-duzenle/tasinmaz-duzenle.component';
import { LoginComponent } from './Login/login/login.component';
import { KullaniciService } from 'src/Services/kullanici.service';
import { LoginGuard } from './Login/login/login.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgSearchPipe } from 'ng-search-pipe';

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
    KullaniciListeleComponent,
    IlceListeleComponent,
    MahalleListeleComponent,
    TasinmazListeleComponent,
    LogListeleComponent,
    IlDuzenleComponent,
    IlceDuzenleComponent,
    KullaniciDuzenleComponent,
    MahalleDuzenleComponent,
    TasinmazDuzenleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    HttpClientModule,
    RouterModule,
    DataTablesModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgSearchPipe
  ],
  providers: [KullaniciService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
