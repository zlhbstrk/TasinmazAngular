import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kullanici-listele',
  templateUrl: './kullanici-listele.component.html',
  styleUrls: ['./kullanici-listele.component.css'],
})
export class KullaniciListeleComponent implements OnInit {
  constructor(private KullaniciServis: KullaniciService) {}

  dtOptions = {};
  dtTrigger: Subject<Kullanici> = new Subject<Kullanici>();

  kullanicilar: Kullanici[] = [];
  kayitSayi:number = 10;
  sayfa:number = 1;
  pageCount:number = 0;

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Brt',
      pagingType: 'full_numbers',
      buttons: [],
    };

    this.KullaniciServis.GetirKullanici(0, this.kayitSayi).subscribe((data) => {
      this.kullanicilar = data
      this.dtTrigger.next();
    });

    this.KullaniciServis.Count().subscribe((count) => {
      this.pageCount = count;
    })
  }

  sayfaGetir(skipDeger:number, takeDeger:number|any, event?:number){
    this.sayfa = event ? event: 1;
    this.kayitSayi = takeDeger;
    this.KullaniciServis.GetirKullanici(skipDeger, takeDeger).subscribe((data) => {
      this.kullanicilar = data;
    });
  }

  Sil(id: number) {
    Swal.fire({
      title: 'Silmek istediğinize emin misiniz?',
      text: 'Silinen kayıt geri getirilemez!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.KullaniciServis.Sil(id).subscribe(() => {
          Swal.fire(
            'Silindi!',
            'Silme işlemi başarıyla tamamlandı.',
            'success'
          ).then(() => {
            this.KullaniciServis.GetirKullanici(0, this.kayitSayi).subscribe((data) => {
              this.kullanicilar = data;
            });
          });
        });
      }
    });
  }
}