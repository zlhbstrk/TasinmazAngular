import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Il } from 'src/Models/Il';
import { IlService } from 'src/Services/il.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-il-duzenle',
  templateUrl: './il-duzenle.component.html',
  styleUrls: ['./il-duzenle.component.css']
})
export class IlDuzenleComponent implements OnInit {

  constructor(private ilServis:IlService, private activatedRoute: ActivatedRoute) { }

  model!:Il;
  id!:number; 
  form = new FormGroup({
    Ad: new FormControl(null, [Validators.required]),
    Plaka: new FormControl(null, [Validators.required])
  });

  onSubmit() {
    if (this.form.valid) {
      this.model = this.form.value;
      this.model.Id = parseInt(this.id.toString());
      this.model.Plaka = parseInt(this.form.controls['Plaka'].value)

      this.ilServis.Duzenle(this.model).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'İl düzenle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
          //this.router.navigate(['/ilekle']);
        }
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((e)=>{
      this.id = e.id;
    });
    this.ilServis.Getir(this.id).subscribe((data)=>{
      this.form.controls['Ad'].setValue(data.Ad)
      this.form.controls['Plaka'].setValue(data.Plaka)
    });
  }
}