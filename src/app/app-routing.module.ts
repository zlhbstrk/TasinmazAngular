import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IlEkleComponent } from './Il/il-ekle/il-ekle.component';
import { IlceEkleComponent } from './Ilce/ilce-ekle/ilce-ekle.component';
import { KullaniciEkleComponent } from './Kullanici/kullanici-ekle/kullanici-ekle.component';
import { MahalleEkleComponent } from './Mahalle/mahalle-ekle/mahalle-ekle.component';
import { TasinmazEkleComponent } from './Tasinmaz/tasinmaz-ekle/tasinmaz-ekle.component';

const routes: Routes = [
  { path: 'ilekle', component: IlEkleComponent },
  { path: 'ilceekle', component: IlceEkleComponent },
  { path: 'mahalleekle', component: MahalleEkleComponent},
  { path: 'kullaniciekle', component: KullaniciEkleComponent},
  { path: 'tasinmazekle', component: TasinmazEkleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
