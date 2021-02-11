import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./tasinmaz-listele.component.css']
})
export class TasinmazListeleComponent implements OnInit {

  constructor(private tasinmazSevis: TasinmazService, private MahalleServis:MahalleService, private IlceServis:IlceService, private IlServis:IlService) { }

  dtOptions = {};
  tasinmazlar: Tasinmaz[] = [];
  mahalleler: Mahalle[] = [];
  ilceler: Ilce[] = [];
  iller: Il[] = [];
  countDizi:number[] = [];
  kayitSayi:number = 10;
  dtTrigger: Subject<Tasinmaz> = new Subject<Tasinmaz>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrti',
      pagingType: 'full_numbers',
      buttons: [
        'excel'
      ]
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
    this.tasinmazSevis.GetirTasinmaz(skipDeger, takeDeger).subscribe((data) => {
      this.tasinmazlar = data
    });
  }

  Sil(id:number){
    Swal.fire({
      title: 'Silmek istediğinize emin misiniz?',
      text: "Silinen kayıt geri getirilemez!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, Sil!',
      cancelButtonText: 'İptal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasinmazSevis.Sil(id).subscribe(()=> {
            Swal.fire(
              'Silindi!',
              'Silme işlemi başarıyla tamamlandı.',
              'success'
            ).then(() => {
              this.tasinmazSevis.GetirTasinmaz(0, this.kayitSayi).subscribe((data) => {
                this.tasinmazlar = data;
              });
            });
        });
      }
    })
  }
}