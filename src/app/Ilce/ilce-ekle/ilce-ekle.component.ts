import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Il } from 'src/Models/Il';
import { Ilce } from 'src/Models/Ilce';
import { IlService } from 'src/Services/il.service';
import { IlceService } from 'src/Services/ilce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ilce-ekle',
  templateUrl: './ilce-ekle.component.html',
  styleUrls: ['./ilce-ekle.component.css']
})
export class IlceEkleComponent implements OnInit {

  constructor(private ilServis:IlService, private ilceServis: IlceService, private router: Router) { }

  iller!:Il[];
  model!:Ilce;

  form = new FormGroup({
    Ad: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    IlId: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
   this.ilServis.FullGetirIl().subscribe((data) => {
      this.iller = data;
    });
  }

  onSubmit(){
    if(this.form.valid) {
      this.model = this.form.value;
      this.ilceServis.Ekle(this.model).subscribe((data) => {
        if(data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'İlçe ekle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
          this.router.navigate(['/ilcelistele']);
        }
      });
    }
  }
}