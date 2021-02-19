import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Il } from 'src/Models/Il';
import { Ilce } from 'src/Models/Ilce';
import { Mahalle } from 'src/Models/Mahalle';
import { Tasinmaz } from 'src/Models/Tasinmaz';
import { IlService } from 'src/Services/il.service';
import { IlceService } from 'src/Services/ilce.service';
import { MahalleService } from 'src/Services/mahalle.service';
import { TasinmazService } from 'src/Services/tasinmaz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasinmaz-listele',
  templateUrl: './tasinmaz-listele.component.html',
  styleUrls: ['./tasinmaz-listele.component.css'],
})
export class TasinmazListeleComponent implements OnInit {
  constructor(
    private tasinmazSevis: TasinmazService,
    private MahalleServis: MahalleService,
    private IlceServis: IlceService,
    private IlServis: IlService
  ) {}

  dtOptions = {};
  dtTrigger: Subject<Tasinmaz> = new Subject<Tasinmaz>();

  tasinmazlar: Tasinmaz[] = [];
  mahalleler: Mahalle[] = [];
  ilceler: Ilce[] = [];
  iller: Il[] = [];
  kayitSayi: number = 10;
  sayfa: number = 1;
  pageCount: number = 1;

  tasinmaz: Tasinmaz[] = [];

  form = new FormGroup({
      searchInput :new FormControl('')
    });

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Brt',
      pagingType: 'full_numbers',
      buttons: ['excel'],
    };

    this.tasinmazSevis.GetirTasinmaz(0, this.kayitSayi).subscribe((data) => {
      this.tasinmazlar = data;

      this.dtTrigger.next();
    });
    this.MahalleServis.FullGetirMahalle().subscribe((data) => {
      this.mahalleler = data;
    });
    this.IlceServis.FullGetirIlce().subscribe((data) => {
      this.ilceler = data;
    });
    this.IlServis.FullGetirIl().subscribe((data) => {
      this.iller = data;
    });
    this.tasinmazSevis.Count().subscribe((count) => {
      this.pageCount = count;
    });
  }

  sayfaGetir(skipDeger: number, takeDeger: number | any, event?: number) {
    this.sayfa = event ? event : 1;
    this.kayitSayi = takeDeger;
    this.tasinmazSevis.GetirTasinmaz(skipDeger, takeDeger).subscribe((data) => {
      this.tasinmazlar = data;
    });
  }

  Search() {
    const input = this.form.controls['searchInput'].value;
    if(input)
    {
      this.tasinmazSevis.Filtre(input).subscribe((data) => {
        alert(data);
        this.tasinmaz = data;
      });
    } 
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
        this.tasinmazSevis.Sil(id).subscribe(() => {
          Swal.fire(
            'Silindi!',
            'Silme işlemi başarıyla tamamlandı.',
            'success'
          ).then(() => {
            this.tasinmazSevis
              .GetirTasinmaz(0, this.kayitSayi)
              .subscribe((data) => {
                this.tasinmazlar = data;
              });
          });
        });
      }
    });
  }
}