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
  mahalleler: Mahalle[] = [];
  ilceler: Ilce[] = [];
  iller: Il[] = [];
  dtTrigger: Subject<Ilce> = new Subject<Ilce>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 10,
      buttons: [
        'excel'
      ]
    };

    this.MahalleServis.GetirMahalle().subscribe((data) => {
      this.mahalleler = data;
      this.dtTrigger.next();
    });
    this.IlceServis.GetirIlce().subscribe((data) => {
      this.ilceler = data;
    });
    this.IlServis.GetirIl().subscribe((data) => {
      this.iller = data;
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
              this.MahalleServis.GetirMahalle().subscribe((data) => {
                this.mahalleler = data;
              });
            });
        });
      }
    })
  }
}
