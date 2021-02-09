import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Il } from 'src/Models/Il';
import { Ilce } from 'src/Models/Ilce';
import { Mahalle } from 'src/Models/Mahalle';
import { IlService } from 'src/Services/il.service';
import { IlceService } from 'src/Services/ilce.service';
import { MahalleService } from 'src/Services/mahalle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mahalle-duzenle',
  templateUrl: './mahalle-duzenle.component.html',
  styleUrls: ['./mahalle-duzenle.component.css']
})
export class MahalleDuzenleComponent implements OnInit {

  constructor(private mahalleServis: MahalleService, private ilceServis:IlceService, private ilServis:IlService, private activatedRoute: ActivatedRoute, private router: Router) { }

  iller!:Il[];
  ilceler!:Ilce[];
  tumIlceler!:Ilce[];
  // mahalleler!:Mahalle[];
  // tumMahalleler!:Mahalle[];
  model!:Mahalle;
  id!:number;

  form = new FormGroup({
    Ad: new FormControl(null, [Validators.required]),
    IlId: new FormControl(null, [Validators.required]),
    IlceId: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((e)=>{
      this.id = e.id;
    });

    this.ilServis.GetirIl().subscribe((data) => {
      this.iller = data;
    });

    this.ilceServis.GetirIlce().subscribe((data) => {
      this.ilceler = data;
    });

    this.ilceServis.GetirIlce().subscribe((data) => {
      this.tumIlceler = data;
    });
  
    this.mahalleServis.Getir(this.id).subscribe((data)=>{
      this.form.controls['Ad'].setValue(data.Ad)
      this.form.controls['IlceId'].setValue(data.IlceId)
      this.form.controls['IlId'].setValue(data.Ilce.IlId)
    });
  }
  
  onIlChanged(){
    const ilId:number = this.form.controls['IlId'].value;
    this.ilceler = this.tumIlceler.filter((e)=>{
      return e.IlId == ilId;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.model = this.form.value;
      this.model.Id = parseInt(this.id.toString());
      
      this.mahalleServis.Duzenle(this.model).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Mahalle düzenle işlemi başarıyla tamamlandı.',
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