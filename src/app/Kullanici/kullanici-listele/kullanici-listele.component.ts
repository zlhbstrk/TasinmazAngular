import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Kullanici } from 'src/Models/Kullanici';
import { KullaniciService } from 'src/Services/kullanici.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kullanici-listele',
  templateUrl: './kullanici-listele.component.html',
  styleUrls: ['./kullanici-listele.component.css']
})
export class KullaniciListeleComponent implements OnInit {

  constructor(private KullaniciServis: KullaniciService) { }

  dtOptions = {};
  kullanicilar: Kullanici[] = [];
  model!:Kullanici;
  
  dtTrigger: Subject<Kullanici> = new Subject<Kullanici>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 10,
      buttons: [ ]
    };

    this.KullaniciServis.GetirKullanici().subscribe((data) => {
      this.kullanicilar = data;
      this.dtTrigger.next();
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
        this.KullaniciServis.Sil(id).subscribe(()=> {
            Swal.fire(
              'Silindi!',
              'Silme işlemi başarıyla tamamlandı.',
              'success'
            ).then(() => {
              this.KullaniciServis.GetirKullanici().subscribe((data) => {
                this.kullanicilar = data;
              });
            });
        });
      }
    })
  }
}
