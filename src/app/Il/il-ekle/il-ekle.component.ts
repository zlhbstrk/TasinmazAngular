import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Il } from 'src/Models/Il';
import { IlService } from 'src/Services/il.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-il-ekle',
  templateUrl: './il-ekle.component.html',
  styleUrls: ['./il-ekle.component.css'],
})
export class IlEkleComponent implements OnInit {

  constructor(private ilServis:IlService, private router: Router) {}

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
            text: 'İl ekle işlemi başarıyla tamamlandı.',
            icon: 'success',
            confirmButtonText: 'Tamam',
          }).then(()=>{
            this.form.reset();
          });
          this.router.navigate(['/illistele']);
        }
      });
    } 
  }
  ngOnInit(): void {}
}