import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ilce } from 'src/Models/Ilce';
import { IlceService } from 'src/Services/ilce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ilce-duzenle',
  templateUrl: './ilce-duzenle.component.html',
  styleUrls: ['./ilce-duzenle.component.css']
})
export class IlceDuzenleComponent implements OnInit {

  constructor(private ilceServis:IlceService, private activatedRoute: ActivatedRoute) { }

  model!:Ilce;
  id!:number; 
  form = new FormGroup({
    Ad: new FormControl(null, [Validators.required]),
    IlId: new FormControl(null, [Validators.required])
  });
  
  onSubmit() {
    if (this.form.valid) {
      this.model = this.form.value;
      this.model.Id = parseInt(this.id.toString());

      this.ilceServis.Duzenle(this.model).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'İlçe düzenle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
        }
      });
    }
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((e)=>{
      this.id = e.id;
    });

    this.ilceServis.Getir(this.id).subscribe((data)=>{
      this.form.controls['Ad'].setValue(data.Ad)
      this.form.controls['IlId'].setValue(data.IlId)
    });
  }
}
