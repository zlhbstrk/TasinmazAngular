import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Il } from 'src/Models/Il';
import { IlService } from 'src/Services/il.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-il-listele',
  templateUrl: './il-listele.component.html',
  styleUrls: ['./il-listele.component.css']
})
export class IlListeleComponent implements OnInit {

  constructor(private IlServis: IlService) { }
  
  dtOptions = {};
  iller: Il[] = [];
  countDizi:number[] = [];
  kayitSayi:number = 10;
  dtTrigger: Subject<Il> = new Subject<Il>();

  ngOnInit(): void {
    this.dtOptions = {
      dom: 'Bfrti',
      pagingType: 'full_numbers',
      buttons: [ ]
    };

    this.IlServis.GetirIl(0, this.kayitSayi).subscribe((data) => {
      this.iller = data;
      this.dtTrigger.next();    
    });

    this.IlServis.Count().subscribe((count) => {
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
    this.IlServis.GetirIl(skipDeger, takeDeger).subscribe((data) => {
      this.iller = data
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
        this.IlServis.Sil(id).subscribe(()=> {
            Swal.fire(
              'Silindi!',
              'Silme işlemi başarıyla tamamlandı.',
              'success'
            ).then(() => {
              this.dtOptions
              this.IlServis.GetirIl(0, this.kayitSayi).subscribe((data) => {
                this.iller = data;
              });
             // this.router.navigate(['/illistele']);
            });
        });
      }
    })
  }
}