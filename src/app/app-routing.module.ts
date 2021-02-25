import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IlDuzenleComponent } from './Il/il-duzenle/il-duzenle.component';
import { IlEkleComponent } from './Il/il-ekle/il-ekle.component';
import { IlListeleComponent } from './Il/il-listele/il-listele.component';
import { IlceDuzenleComponent } from './Ilce/ilce-duzenle/ilce-duzenle.component';
import { IlceEkleComponent } from './Ilce/ilce-ekle/ilce-ekle.component';
import { IlceListeleComponent } from './Ilce/ilce-listele/ilce-listele.component';
import { KullaniciDuzenleComponent } from './Kullanici/kullanici-duzenle/kullanici-duzenle.component';
import { KullaniciEkleComponent } from './Kullanici/kullanici-ekle/kullanici-ekle.component';
import { KullaniciListeleComponent } from './Kullanici/kullanici-listele/kullanici-listele.component';
import { LogListeleComponent } from './Log/log-listele/log-listele.component';
import { LoginComponent } from './Login/login/login.component';
import { LoginGuard } from './Login/login/login.guard';
import { MahalleDuzenleComponent } from './Mahalle/mahalle-duzenle/mahalle-duzenle.component';
import { MahalleEkleComponent } from './Mahalle/mahalle-ekle/mahalle-ekle.component';
import { MahalleListeleComponent } from './Mahalle/mahalle-listele/mahalle-listele.component';
import { TasinmazDuzenleComponent } from './Tasinmaz/tasinmaz-duzenle/tasinmaz-duzenle.component';
import { TasinmazEkleComponent } from './Tasinmaz/tasinmaz-ekle/tasinmaz-ekle.component';
import { TasinmazListeleComponent } from './Tasinmaz/tasinmaz-listele/tasinmaz-listele.component';
import { WelcomeComponent } from './Welcome/welcome/welcome.component';

const routes: Routes = [
  { path: 'ilekle', component: IlEkleComponent, canActivate:[LoginGuard] },
  { path: 'ilceekle', component: IlceEkleComponent, canActivate:[LoginGuard] },
  { path: 'mahalleekle', component: MahalleEkleComponent, canActivate:[LoginGuard]},
  { path: 'kullaniciekle', component: KullaniciEkleComponent, canActivate:[LoginGuard]},
  { path: 'tasinmazekle', component: TasinmazEkleComponent, canActivate:[LoginGuard]},
  { path: 'illistele', component: IlListeleComponent, canActivate:[LoginGuard]},
  { path: 'kullanicilistele', component: KullaniciListeleComponent, canActivate:[LoginGuard]},
  { path: 'ilcelistele', component: IlceListeleComponent, canActivate:[LoginGuard]},
  { path: 'mahallelistele', component: MahalleListeleComponent, canActivate:[LoginGuard]},
  { path: 'tasinmazlistele', component: TasinmazListeleComponent, canActivate:[LoginGuard]},
  { path: 'loglistele', component: LogListeleComponent, canActivate:[LoginGuard]},
  { path: 'ilduzenle/:id', component: IlDuzenleComponent, canActivate:[LoginGuard]},
  { path: 'ilceduzenle/:id', component: IlceDuzenleComponent, canActivate:[LoginGuard]},
  { path: 'kullaniciduzenle/:id', component: KullaniciDuzenleComponent, canActivate:[LoginGuard]},
  { path: 'mahalleduzenle/:id', component: MahalleDuzenleComponent, canActivate:[LoginGuard]},
  { path: 'tasinmazduzenle/:id', component: TasinmazDuzenleComponent, canActivate:[LoginGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'welcome', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}