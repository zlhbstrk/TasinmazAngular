import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Il } from 'src/Models/Il';
import { Ilce } from 'src/Models/Ilce';
import { Mahalle } from 'src/Models/Mahalle';
import { IlService } from 'src/Services/il.service';
import { IlceService } from 'src/Services/ilce.service';
import { MahalleService } from 'src/Services/mahalle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mahalle-listele',
  templateUrl: './mahalle-listele.component.html',
  styleUrls: ['./mahalle-listele.component.css']
})
export class MahalleListeleComponent implements OnInit {

  constructor(private MahalleServis:MahalleService, private IlceServis:IlceService, private IlServis:IlService) { }

  dtOptions = {};
  dtTrigger: Subject<Mahalle> = new Subject<Mahalle>();

  mahalleler: Mahalle[] = [];
  ilceler: Ilce[] = [];
  iller: Il[] = [];
  kayitSayi:number = 10;
  sayfa:number = 1;
  pageCount:number = 1;

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Brt',
      pagingType: 'full_numbers',
      buttons: [ ],
      responsive: true
    };

    this.MahalleServis.GetirMahalle(0, this.kayitSayi).subscribe((data) => {
      this.mahalleler = data;
      this.dtTrigger.next();
    });
    this.IlceServis.FullGetirIlce().subscribe((data) => {
      this.ilceler = data;
    });
    this.IlServis.FullGetirIl().subscribe((data) => {
      this.iller = data;
    });
    this.MahalleServis.Count().subscribe((count) => {
      this.pageCount = count;
    })
  }

  sayfaGetir(skipDeger:number, takeDeger:number|any, event?:number){
    this.sayfa = event ? event: 1;
    this.kayitSayi = takeDeger;
    
    this.MahalleServis.GetirMahalle(skipDeger, takeDeger).subscribe((data) => {
      this.mahalleler = data
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
        this.MahalleServis.Sil(id).subscribe(()=> {
            Swal.fire(
              'Silindi!',
              'Silme işlemi başarıyla tamamlandı.',
              'success'
            ).then(() => {
              this.dtOptions
              this.MahalleServis.GetirMahalle(0, this.kayitSayi).subscribe((data) => {
                this.mahalleler = data;
              });
            });
        });
      }
    })
  }
}