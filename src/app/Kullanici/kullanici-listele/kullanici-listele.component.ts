import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { skipUntil } from 'rxjs/operators';
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
  kullanicilar: Kullanici[] = [];
  countDizi:number[] = [];
  kayitSayi:number = 10;
  dtTrigger: Subject<Kullanici> = new Subject<Kullanici>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrti',
      pagingType: 'full_numbers',
      buttons: [],
    };

    this.KullaniciServis.GetirKullanici(0, this.kayitSayi).subscribe((data) => {
      this.kullanicilar = data
      this.dtTrigger.next();
    });

    this.KullaniciServis.Count().subscribe((count) => {
      this.countDiziDoldur(count);
    })
  }

  countDiziDoldur(count:number){
    const buttonCount = Math.ceil(count/this.kayitSayi);
    for(let i=0;i<buttonCount;i++){
      this.countDizi.push(i);
    }
  }

  sayfaGetir(skipDeger:number, takeDeger:number){
    this.KullaniciServis.GetirKullanici(skipDeger, takeDeger).subscribe((data) => {
      this.kullanicilar = data
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
            this.KullaniciServis.GetirKullanici(0,this.kayitSayi).subscribe((data) => {
              this.kullanicilar = data;
            });
          });
        });
      }
    });
  }
}