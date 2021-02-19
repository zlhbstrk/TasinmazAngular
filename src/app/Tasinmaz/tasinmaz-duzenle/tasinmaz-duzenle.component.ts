import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-tasinmaz-duzenle',
  templateUrl: './tasinmaz-duzenle.component.html',
  styleUrls: ['./tasinmaz-duzenle.component.css']
})
export class TasinmazDuzenleComponent implements OnInit {

  constructor(private mahalleServis: MahalleService, private ilceServis:IlceService, private ilServis:IlService, private activatedRoute: ActivatedRoute, private router: Router, private tasinmazServis: TasinmazService) { }

  iller!:Il[];
  ilceler!:Ilce[];
  tumIlceler!:Ilce[];
  mahalleler!:Mahalle[];
  tumMahalleler!:Mahalle[];
  model!:Tasinmaz;
  id!:number;
  
  form = new FormGroup({
    IlId: new FormControl(null, [Validators.required]),
    IlceId: new FormControl(null, [Validators.required]),
    MahalleId: new FormControl(null, [Validators.required]),
    Ada: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    Parsel: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    Nitelik: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    Adres: new FormControl(null, [Validators.required, Validators.maxLength(100)])
  });
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((e)=>{
      this.id = e.id;
    });
    this.ilServis.FullGetirIl().subscribe((data) => {
      this.iller = data;
    });
    this.ilceServis.FullGetirIlce().subscribe((data) => {
      this.tumIlceler = data;
    });
    this.mahalleServis.FullGetirMahalle().subscribe((data) => {
      this.tumMahalleler = data;
    });
    this.tasinmazServis.Getir(this.id).subscribe((data)=>{
      this.form.controls['IlId'].setValue(data.IlId)
      this.onIlChanged()
      this.form.controls['IlceId'].setValue(data.IlceId)
      this.onIlceChanged()
      this.form.controls['MahalleId'].setValue(data.MahalleId)
      this.form.controls['Ada'].setValue(data.Ada)
      this.form.controls['Parsel'].setValue(data.Parsel)
      this.form.controls['Nitelik'].setValue(data.Nitelik)
      this.form.controls['Adres'].setValue(data.Adres)
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

  onSubmit() {
    if (this.form.valid) {
      this.model = this.form.value;
      this.model.Id = parseInt(this.id.toString());

      this.tasinmazServis.Duzenle(this.model).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Taşınmaz düzenle işlemi başarıyla tamamlandı.',
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
