import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-tasinmaz-ekle',
  templateUrl: './tasinmaz-ekle.component.html',
  styleUrls: ['./tasinmaz-ekle.component.css']
})
export class TasinmazEkleComponent implements OnInit {

  constructor(private ilServis:IlService, private ilceServis:IlceService, private mahalleServis:MahalleService, private tasinmazServis:TasinmazService, private router: Router) { }

  iller!:Il[];
  tumIlceler!:Ilce[];
  ilceler!:Ilce[];
  tumMahalleler!:Mahalle[];
  mahalleler!:Mahalle[];
  model!:Tasinmaz;

  form = new FormGroup({
    IlId: new FormControl(null, [Validators.required]),
    IlceId: new FormControl(null, [Validators.required]),
    MahalleId: new FormControl(null, [Validators.required]),
    Ada: new FormControl(null, [Validators.required]),
    Parsel: new FormControl(null, [Validators.required]),
    Nitelik: new FormControl(null, [Validators.required]),
    Adres: new FormControl(null, [Validators.required])
  });
  
  ngOnInit(): void {
    this.ilServis.GetirIl().subscribe((data) => {
      this.iller = data;
    }),
    this.ilceServis.GetirIlce().subscribe((data) => {
      this.ilceler = data;
    }),
    this.ilceServis.GetirIlce().subscribe((data) => {
      this.tumIlceler = data;
    }),
    this.mahalleServis.GetirMahalle().subscribe((data) => {
      this.mahalleler = data;
    });
    this.mahalleServis.GetirMahalle().subscribe((data) => {
      this.tumMahalleler = data;
    });
  }

  onIlChanged(){
    const ilId:number = this.form.controls['IlId'].value;
    this.ilceler = this.tumIlceler.filter((e)=>{
      return e.IlId == ilId;
    });
  }

  onIlceChanged(){
    const ilceId:number = this.form.controls['IlceId'].value;
    this.mahalleler = this.tumMahalleler.filter((e)=>{
      return e.IlceId == ilceId;
    });
  }

  onSubmit(){
    if(this.form.valid) {
      this.model = this.form.value;
      this.tasinmazServis.Ekle(this.model).subscribe((data) => {
        if(data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Taşınmaz ekle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
          this.router.navigate(['/tasinmazlistele']);
        }
      });
    }
  }
}
