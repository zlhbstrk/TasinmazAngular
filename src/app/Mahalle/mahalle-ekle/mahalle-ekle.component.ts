import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Il } from 'src/Models/Il';
import { Ilce } from 'src/Models/Ilce';
import { Mahalle } from 'src/Models/Mahalle';
import { IlService } from 'src/Services/il.service';
import { IlceService } from 'src/Services/ilce.service';
import { MahalleService } from 'src/Services/mahalle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mahalle-ekle',
  templateUrl: './mahalle-ekle.component.html',
  styleUrls: ['./mahalle-ekle.component.css']
})
export class MahalleEkleComponent implements OnInit {

  constructor(private ilServis:IlService, private ilceServis:IlceService, private mahalleServis:MahalleService, private router: Router) { }

  iller!:Il[];
  tumIlceler!:Ilce[];
  ilceler:Ilce[] = [];
  model!:Mahalle;

  form = new FormGroup({
    Ad: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
    IlId: new FormControl(null, [Validators.required]),
    IlceId: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    this.ilServis.FullGetirIl().subscribe((data) => {
      this.iller = data;
    });
    this.ilceServis.FullGetirIlce().subscribe((data) => {
      this.tumIlceler = data;
    });
  }

  onIlChanged(){
    const ilId:number = this.form.controls['IlId'].value;
    this.ilceler = this.tumIlceler.filter((e)=>{
      // if(e.IlId == ilId){
      //   return true;
      // }
      // else{
      //   return false;
      // }
      return e.IlId == ilId;
    });
  }

  onSubmit(){
    if(this.form.valid) {
      this.model = this.form.value;
      this.mahalleServis.Ekle(this.model).subscribe((data) => {
        if(data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Mahalle ekle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
          this.router.navigate(['/mahallelistele']);
        }
      });
    }
  }
}