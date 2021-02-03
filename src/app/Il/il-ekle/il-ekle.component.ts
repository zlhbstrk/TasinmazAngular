import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Il } from 'src/Models/Il';
import { IlService } from 'src/Services/il.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-il-ekle',
  templateUrl: './il-ekle.component.html',
  styleUrls: ['./il-ekle.component.css'],
})
export class IlEkleComponent implements OnInit {

  constructor(private ilServis:IlService) {}

  model!:Il;

  form = new FormGroup({
    Ad: new FormControl(null, [Validators.required]),
    Plaka: new FormControl(null, [Validators.required])
  });
  
  onSubmit() {
    if (this.form.valid) {
      this.model = this.form.value;
      this.ilServis.Ekle(this.model).subscribe((data) => {
        if (data) {
          Swal.fire({
            title: 'Başarılı',
            text: 'İl başarıyla eklendi.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          });
        }
      });
    }
  }
  ngOnInit(): void {}
}