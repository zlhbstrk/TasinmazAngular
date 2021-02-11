import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Il } from 'src/Models/Il';
import { Ilce } from 'src/Models/Ilce';
import { IlService } from 'src/Services/il.service';
import { IlceService } from 'src/Services/ilce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ilce-listele',
  templateUrl: './ilce-listele.component.html',
  styleUrls: ['./ilce-listele.component.css']
})
export class IlceListeleComponent implements OnInit {

  constructor(private IlceServis: IlceService, private IlServis: IlService) { }

  dtOptions = {};
  ilceler: Ilce[] = [];
  iller: Il[] = [];
  countDizi:number[] = [];
  kayitSayi:number = 10;
  dtTrigger: Subject<Ilce> = new Subject<Ilce>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrti',
      pagingType: 'full_numbers',
      buttons: [ ]
    };

    this.IlceServis.GetirIlce(0,this.kayitSayi).subscribe((data) => {
      this.ilceler = data;
      this.dtTrigger.next();
    });
    this.IlServis.FullGetirIl().subscribe((data) => {
      this.iller = data;
    });
    
    this.IlceServis.Count().subscribe((count) => {
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
    this.IlceServis.GetirIlce(skipDeger, takeDeger).subscribe((data) => {
      this.ilceler = data
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
        this.IlceServis.Sil(id).subscribe(()=> {
            Swal.fire(
              'Silindi!',
              'Silme işlemi başarıyla tamamlandı.',
              'success'
            ).then(() => {
              this.IlceServis.GetirIlce(0, this.kayitSayi).subscribe((data) => {
                this.ilceler = data;
              });
            });
        });
      }
    })
  }
}