import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Tasinmaz } from 'src/Models/Tasinmaz';
import { TasinmazService } from 'src/Services/tasinmaz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasinmaz-listele',
  templateUrl: './tasinmaz-listele.component.html',
  styleUrls: ['./tasinmaz-listele.component.css']
})
export class TasinmazListeleComponent implements OnInit {

  constructor(private tasinmazSevis: TasinmazService) { }

  dtOptions = {};
  tasinmazlar: Tasinmaz[] = [];
  dtTrigger: Subject<Tasinmaz> = new Subject<Tasinmaz>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrtip',
      pagingType: 'full_numbers',
      pageLength: 10,
      buttons: [
        'excel'
      ]
    };

    this.tasinmazSevis.GetirTasinmaz().subscribe((data) => {
      this.tasinmazlar = data;
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
        this.tasinmazSevis.Sil(id).subscribe(()=> {
            Swal.fire(
              'Silindi!',
              'Silme işlemi başarıyla tamamlandı.',
              'success'
            ).then(() => {
              this.tasinmazSevis.GetirTasinmaz().subscribe((data) => {
                this.tasinmazlar = data;
              });
            });
        });
      }
    })
  }
}
