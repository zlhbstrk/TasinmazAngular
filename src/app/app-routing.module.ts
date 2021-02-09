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
import { MahalleDuzenleComponent } from './Mahalle/mahalle-duzenle/mahalle-duzenle.component';
import { MahalleEkleComponent } from './Mahalle/mahalle-ekle/mahalle-ekle.component';
import { MahalleListeleComponent } from './Mahalle/mahalle-listele/mahalle-listele.component';
import { TasinmazEkleComponent } from './Tasinmaz/tasinmaz-ekle/tasinmaz-ekle.component';
import { TasinmazListeleComponent } from './Tasinmaz/tasinmaz-listele/tasinmaz-listele.component';

const routes: Routes = [
  { path: 'ilekle', component: IlEkleComponent },
  { path: 'ilceekle', component: IlceEkleComponent },
  { path: 'mahalleekle', component: MahalleEkleComponent},
  { path: 'kullaniciekle', component: KullaniciEkleComponent},
  { path: 'tasinmazekle', component: TasinmazEkleComponent},
  { path: 'illistele', component: IlListeleComponent},
  { path: 'kullanicilistele', component: KullaniciListeleComponent},
  { path: 'ilcelistele', component: IlceListeleComponent},
  { path: 'mahallelistele', component: MahalleListeleComponent},
  { path: 'tasinmazlistele', component: TasinmazListeleComponent},
  { path: 'loglistele', component: LogListeleComponent},
  { path: 'ilduzenle/:id', component: IlDuzenleComponent},
  { path: 'ilceduzenle/:id', component: IlceDuzenleComponent},
  { path: 'kullaniciduzenle/:id', component: KullaniciDuzenleComponent},
  { path: 'mahalleduzenle/:id', component: MahalleDuzenleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}